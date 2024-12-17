import pandas as pd
import json
import re
from zipfile import ZipFile
from collections import Counter
import numpy as np
import emoji

def convert(o):
        if isinstance(o, (np.int64, np.int32)):
            return int(o)
        if isinstance(o, (np.float64, np.float32)):
            return float(o)
        raise TypeError(f"Type {type(o)} not serializable") 

class Chat:
    def __init__(self, file_content) -> None:
        self.file_content = file_content.encode('utf-8') if isinstance(file_content, str) else file_content
        self.data = pd.DataFrame()
        self.pattern = re.compile(r'\[(\d{2}-\d{2}-\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)')
        self.url_pattern = re.compile(r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+')
        self.word_pattern = re.compile(r'\w+')

        self.intervals = ['00:00–06:00', '06:00–12:00', '12:00–18:00', '18:00–24:00']
        self.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        
        self._emoji_cache = {}

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
        if text in self._emoji_cache:
            return self._emoji_cache[text]
        
        result = [c for c in text if emoji.is_emoji(c)]
        self._emoji_cache[text] = result
        return result

    def analyze_emojis(self, df: pd.DataFrame, top_n: int = 10) -> dict:
        
        all_emojis = []
        for chunk in [df[i:i+1000] for i in range(0, len(df), 1000)]:
            chunk_emojis = []
            for message in chunk['Message']:
                emojis = self.extract_emojis(str(message))
                chunk_emojis.extend(emojis)
            all_emojis.extend(chunk_emojis)
        
        emoji_counter = Counter(all_emojis)
        return {
            'top_emojis': dict(emoji_counter.most_common(top_n)),
            'total_emoji_count': int(len(all_emojis))
        }
        
    def calculate_reading_time(self, text: str) -> float:
        """Estimate the reading time based on the word count."""
        word_count = len(self.word_pattern.findall(text))
        return round(word_count / 200, 2)

    def read(self) -> None:
        
        with ZipFile(self.file_content, 'r') as zip_file:
            with zip_file.open('_chat.txt') as chat:
                chunk_size = 1024 * 1024  # 1MB chunks
                content = []
                while True:
                    chunk = chat.read(chunk_size)
                    if not chunk:
                        break
                    content.append(chunk.decode('utf-8'))
                content = ''.join(content)
                
                # Process content
                lines = content.splitlines()[1:]  # Skip first line
                if ' contact.' in lines[0]:
                    lines = lines[1:]  # Skip second line if needed
                content = '\n'.join(lines)
        
        matches = self.pattern.findall(content)

        data = {
            'DateTime': [f"{date} {time}" for date, time, _, _ in matches],
            'Sender': [sender for _, _, sender, _ in matches],
            'Message': [message for _, _, _, message in matches]
        }
        
        self.data = pd.DataFrame(data)
        self.data['DateTime'] = pd.to_datetime(self.data['DateTime'], format='%d-%m-%Y %H:%M:%S')
    
    def getData(self) -> pd.DataFrame:
        return self.data

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
            if hour < 6:
                return self.intervals[0]
            elif hour < 12:
                return self.intervals[1]
            elif hour < 18:
                return self.intervals[2]
            return self.intervals[3]

        # Apply interval mapping
        self.data['6HourInterval'] = self.data['Hour'].apply(get_6hour_interval)

        # Group by DayOfWeek and 6HourInterval, then calculate the mean
        grouped = self.data.groupby(['DayOfWeek', '6HourInterval']).size()
        total_days = int(len(self.data['DateTime'].dt.date.unique()))
        
        result = {day: {interval: 0 for interval in self.intervals} for day in self.days}
        
        for (day, interval), count in grouped.items():
            if day in result:
                result[day][interval] = count / total_days
                
        return result

    def getExport(self) -> dict:
        return self.export   

    def getJSON(self) -> str:
        return json.dumps(self.export, default=convert)

    
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
        counts = pd.Series(index=pd.MultiIndex.from_product(
            [range(1, 8), range(24)], names=['DayOfWeek', 'Hour']), 
            data=0)
            
        temp_counts = self.data.value_counts(['DayOfWeek', 'Hour']).astype("int")
        counts.update(temp_counts)
        
        return {
            day: [counts.get((day, hour), 0) for hour in range(24)]
            for day in range(1, 8)
        }
    
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
        message = self.url_pattern.sub('', message)
        # Remove special characters but keep emojis
        message = ''.join(c for c in message if c.isalnum() or c.isspace() or emoji.is_emoji(c))
        # Remove numbers
        message = self.word_pattern.sub('', message)
        return message.strip().lower()
    
    def get_top_10_words(self, df: pd.DataFrame) -> dict:
        # Process each message
        word_counts = Counter()
        
        chunk_size = 1000
        
        for i in range(0, len(df), chunk_size):
            chunk = df.iloc[i:i + chunk_size]
            chunk_text = ' '.join(chunk['Message'].astype(str))
            
            # Clean text in bulk
            cleaned_text = self.clean_message(chunk_text)
            words = self.word_pattern.findall(cleaned_text)
            
            # Update counter
            word_counts.update(words)
        
        return dict(word_counts.most_common(10))

    def analyse(self) -> None:
        message_count = int(len(self.data))
        chunk_size = 1000
        url_count = 0
        all_messages = []
        for i in range(0, len(self.data), chunk_size):
            chunk = self.data.iloc[i:i + chunk_size]
            chunk_messages = ' '.join(chunk['Message'].astype(str))
            url_count += len(self.url_pattern.findall(chunk_messages))
            all_messages.append(chunk_messages)
        
        all_messages = ' '.join(all_messages)
        
        self.export.update({
            'total_messages': int(message_count),
            'total_urls': int(url_count),  # Only use first 1000 chars for language detection
            'reading_time': self.calculate_reading_time(all_messages),
            'people': [self.analyse_per_person(person, message_count) 
                      for person in self.data['Sender'].unique()],
            'weekly_message_counts': self.analyse_time(),
            'time': self.analyze_average_6hour_intervals(),
            'words': self.get_top_10_words(self.data)
        })
        

