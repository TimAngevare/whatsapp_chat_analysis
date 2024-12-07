import pandas as pd
import json
import re
from zipfile import ZipFile
from collections import Counter
from langdetect import detect
import emoji


class Chat:
    def __init__(self, file_content) -> None:
        if isinstance(file_content, str):
            self.file_content = file_content.encode('utf-8')
        else:
            self.file_content = file_content
        self.data = {'DateTime' : [], 'Sender' : [], 'Message' : []}
        self.pattern = re.compile(
    r'\[(\d{2}-\d{2}-\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)')
        self.url_pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
        
        self.export = {
            'total_messages' : 0,
            'total_urls' : 0,
            'people' : [],
            'language': None
        }
        self.media_keywords = {
            'afbeelding': 'pictures',
            'sticker': 'stickers',
            'audio': 'audio_files'
        }
        # Common words to filter out for both languages
        self.common_filters = {
            'media_words': {'audio', 'image', 'video', 'gif', 'sticker', 'afbeelding', 'audio'},
            'meta_words': {'omitted', 'weggelaten', 'deleted', 'verwijderd'},
        }
        
        # Language-specific stop words
        self.stop_words = {
            'en': {
                'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
                'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
                'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
                'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there',
                'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get',
                'which', 'go', 'me', 'yeah', 'yes', 'no', 'when', 'make', 'can',
                'like', 'time', 'just', 'him', 'know', 'take', 'people', 'into',
                'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
                'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
                'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our',
                'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
                'any', 'these', 'give', 'day', 'most', 'us', 'lol', 'haha'
            },
            'nl': {
                'de', 'het', 'een', 'en', 'van', 'ik', 'te', 'dat', 'die', 'in',
                'is', 'het', 'niet', 'zijn', 'je', 'hij', 'was', 'op', 'zij',
                'zo', 'maar', 'had', 'wat', 'toen', 'nu', 'om', 'dan', 'ook',
                'deze', 'aan', 'nog', 'bij', 'uit', 'veel', 'zal', 'mijn', 'er',
                'over', 'ja', 'nee', 'heb', 'kan', 'wel', 'geen', 'zou', 'heeft',
                'waar', 'moet', 'allen', 'hun', 'wie', 'tot', 'ter', 'ons',
                'zelf', 'hier', 'daar', 'haar', 'naar', 'hoe', 'met', 'voor',
                'zij', 'zich', 'als', 'werd', 'nog', 'waren', 'eens', 'tijd',
                'dit', 'door', 'men', 'dus', 'iets', 'groot', 'kunnen', 'heel',
                'vaak', 'goed', 'even', 'toch', 'snel', 'laat', 'doen', 'lekker',
                'haha', 'hoor', 'nou'
            }
        }
    
    def extract_emojis(self, text: str) -> list:
        
        return [c for c in text if emoji.is_emoji(c)]

    def analyze_emojis(self, df: pd.DataFrame, top_n: int = 10) -> dict:
        
        all_emojis = []
        
        # Extract emojis from all messages
        for message in df['Message']:
            emojis_in_message = self.extract_emojis(str(message))
            all_emojis.extend(emojis_in_message)
        
        # Count emojis
        emoji_counter = Counter(all_emojis)
        
        # Get top N emojis with their counts
        top_emojis = dict(emoji_counter.most_common(top_n))
        
        return {
            'top_emojis': top_emojis,
            'total_emoji_count': len(all_emojis)
        }
    def calculate_reading_time(self, text: str) -> float:
        """Estimate the reading time based on the word count."""
        word_count = len(re.findall(r'\w+', text))
        words_per_minute = 200  # Average reading speed (wpm)
        reading_time_minutes = word_count / words_per_minute
        return round(reading_time_minutes, 2)

    def read(self) -> None:
        
        with ZipFile(self.file_content, 'r') as zip_file:
            with zip_file.open('_chat.txt') as chat:
                # Read and decode the content
                # Skip end-to-end encrypted message
                chat.readline()  # Skip first line
                
                # Read and decode first line
                first_line = chat.readline().decode('utf-8')
                
                if ' contact.' not in first_line:
                    # Read and decode remaining content
                    remaining_content = chat.read().decode('utf-8')
                    content = first_line + remaining_content
                else:
                    content = chat.read().decode('utf-8')
        
        matches = self.pattern.findall(content)

        for match in matches:
            date, time, sender, message = match
            self.data['DateTime'].append(date + ' ' + time)
            self.data['Sender'].append(sender)
            self.data['Message'].append(message)
        
        self.data = pd.DataFrame(self.data)
        self.data['DateTime'] = pd.to_datetime(self.data['DateTime'],format='%d-%m-%Y %H:%M:%S')
    
    def getData(self) -> pd.DataFrame:
        return self.data
    
    def detect_language(self, text: str) -> str:
        try:
            return detect(text)
        except:
            return 'en'  # Default to English if detection fails

    def count_media_messages_per_person(self, person: str) -> dict:
        person_messages = self.data[self.data['Sender'] == person]
        media_counts = {media: 0 for media in self.media_keywords.values()}

        for message in person_messages['Message']:
            for keyword, media_type in self.media_keywords.items():
                if keyword in message.lower():
                    media_counts[media_type] += 1

        return media_counts

    def analyze_average_6hour_intervals(self) -> dict:
        self.data['DayOfWeek'] = self.data['DateTime'].dt.day_name()
        self.data['Hour'] = self.data['DateTime'].dt.hour

        # Define 6-hour intervals
        def get_6hour_interval(hour):
            if 0 <= hour < 6:
                return '00:00–06:00'
            elif 6 <= hour < 12:
                return '06:00–12:00'
            elif 12 <= hour < 18:
                return '12:00–18:00'
            else:
                return '18:00–24:00'

        # Apply interval mapping
        self.data['6HourInterval'] = self.data['Hour'].apply(get_6hour_interval)

        # Group by DayOfWeek and 6HourInterval, then calculate the mean
        grouped = (
            self.data.groupby(['DayOfWeek', '6HourInterval'])
            .size()
            .reset_index(name='Count')
        )

        # Create a structured dictionary with days and intervals
        result = {day: {interval: 0 for interval in ['00:00–06:00', '06:00–12:00', '12:00–18:00', '18:00–24:00']}
                  for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}

        for _, row in grouped.iterrows():
            result[row['DayOfWeek']][row['6HourInterval']] = row['Count']

        # Calculate the average messages per 6-hour interval for each day
        total_days = len(self.data['DateTime'].dt.date.unique())
        for day in result:
            for interval in result[day]:
                result[day][interval] /= total_days

        return result

    def getExport(self) -> dict:
        return self.export
    
    def getJSON(self) -> json.dump:
        return json.dumps(self.export)
    
    def saveFile(self) -> None:
        f = open('infographic-react/src/data.json','w+')
        f.write(self.getJSON())
        f.close()

    def analyse_per_person(self, person : str, message_count : int) -> dict:
        person_messages = self.data[self.data.Sender==person]
        first = person_messages.iloc[0]
        percentage = len(person_messages) / message_count
        
        person_emoji_stats = self.analyze_emojis(person_messages)
        # Calculate the statistics
        avg_message = round(person_messages['Message'].apply(len).mean(),1)
        # Extract the specific values we need
        person_stats = {'name': person, 'count' : len(person_messages), 'percentage' : round(percentage, 2),'first_message' : {'message' : first['Message'], 'timeStamp' : str(first['DateTime'])}, 'emoji_stats' : person_emoji_stats, 'media_count' : self.count_media_messages_per_person(person), 'average_message_length': avg_message}
        return person_stats
    
    def analyse_time(self) -> dict:
        self.data['DayOfWeek'] = self.data['DateTime'].dt.dayofweek + 1  # Adding 1 to make it 1-7 instead of 0-6
        self.data['Hour'] = self.data['DateTime'].dt.hour
        grouped = self.data.groupby(['DayOfWeek', 'Hour']).size().unstack(fill_value=0)
        result = {}
        for day in range(1, 8):
            if day in grouped.index:
                result[day] = grouped.loc[day].tolist()
            else:
                result[day] = [0] * 24
        return result
    
    def is_meaningful_word(self, word: str, language: str) -> bool:
        # Check if word is long enough
        if len(word) < 3:
            return False
            
        # Check if word is in any filter lists
        for filter_set in self.common_filters.values():
            if word in filter_set:
                return False
                
        # Check if word is a stop word for the detected language
        if word in self.stop_words.get(language, set()):
            return False
            
        return True
    
    def clean_message(self, message: str) -> str:
        # Remove URLs
        message = re.sub(self.url_pattern, '', message)
        # Remove special characters but keep emojis
        message = ''.join(c for c in message if c.isalnum() or c.isspace() or emoji.is_emoji(c))
        # Remove numbers
        message = re.sub(r'\d+', '', message)
        return message.strip().lower()
    
    def get_top_10_words(self, df: pd.DataFrame) -> dict:
        # Combine all messages into a single string for language detection
        all_messages = ' '.join(df['Message'].astype(str))
        language = self.detect_language(all_messages)
        self.export['language'] = language
        
        # Process each message
        word_counts = Counter()
        
        for message in df['Message']:
            # Clean the message
            cleaned_message = self.clean_message(message)
            
            # Split into words and filter
            words = re.findall(r'\w+', cleaned_message)
            meaningful_words = [
                word for word in words 
                if self.is_meaningful_word(word, language)
            ]
            
            # Update word counts
            word_counts.update(meaningful_words)
        
        # Get the top 10 most common meaningful words
        top_10 = word_counts.most_common(10)
        return dict(top_10)

    def analyse(self) -> None:
        message_count = len(self.data)
        self.export['total_messages'] = message_count
        
        # Detect language once for the entire chat
        all_messages = ' '.join(self.data['Message'].astype(str))
        self.export['total_urls'] = len(re.findall(self.url_pattern, all_messages))
        language = self.detect_language(all_messages)
        
        persons = self.data.Sender.unique()
        self.export['people'] = [
            self.analyse_per_person(person, message_count) 
            for person in persons
        ]
        self.export['weekly_message_counts'] = self.analyse_time()
        self.export['reading_time'] =self.calculate_reading_time(all_messages)
        self.export['time'] = self.analyze_average_6hour_intervals()
        self.export['words'] = self.get_top_10_words(self.data)

