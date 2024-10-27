import pandas as pd
import json
from zipfile import ZipFile 
import re
from collections import Counter
from pattern.nl import sentiment as nl_sentiment # type: ignore
from pattern.en import sentiment as en_sentiment # type: ignore
from langdetect import detect # type: ignore
import emoji


class Chat:
    def __init__(self, filePath : str) -> None:
        self.filePath = filePath
        self.data = {'DateTime' : [], 'Sender' : [], 'Message' : []}
        self.pattern = re.compile(
    r'\[(\d{2}-\d{2}-\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)')
        
    r'\[(\d{2}-\d{2}-\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)')
        
        self.export = {
            'total_messages' : 0,
            'people' : [],
            'language': None
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

    def read(self) -> None:
        with ZipFile(self.filePath, 'r') as file:
            file.extractall(path='./')
            with open('./_chat.txt', 'r', encoding='utf-8') as chat:
                #skip end-end encrypted message
                next(chat)
                first_line = chat.readline()
                if ' contact.' not in first_line:
                    content = first_line + chat.read()
                else:
                    content = chat.read()
                first_line = chat.readline()
                if ' contact.' not in first_line:
                    content = first_line + chat.read()
                else:
                    content = chat.read()
        
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
    
    def analyze_sentiment(self, text: str, language: str) -> float:
        try:
            if language == 'nl':
                return nl_sentiment(text)[0]
            else:
                return en_sentiment(text)[0]
        except:
            return 0.0  # Neutral sentiment if analysis fails
    
    def detect_language(self, text: str) -> str:
        try:
            return detect(text)
        except:
            return 'en'  # Default to English if detection fails
    
    def analyze_sentiment(self, text: str, language: str) -> float:
        try:
            if language == 'nl':
                return nl_sentiment(text)[0]
            else:
                return en_sentiment(text)[0]
        except:
            return 0.0  # Neutral sentiment if analysis fails
    
    def getExport(self) -> dict:
        return self.export
    
    def getJSON(self) -> json.dump:
        return json.dumps(self.export)
    
    def saveFile(self) -> None:
        f = open('infographic_template/data.json','w+')
        f.write(self.getJSON())
        f.close()

    def analyse_per_person(self, person : str, message_count : int) -> dict:
        person_messages = self.data[self.data.Sender==person]
        first = person_messages.iloc[0]
        percentage = len(person_messages) / message_count
        
        person_emoji_stats = self.analyze_emojis(person_messages)
        # Calculate the statistics
        stats = person_messages['sentiment'].describe()

        # Extract the specific values we need
        min_val = stats['min']
        q1 = stats['25%']
        median = stats['50%']
        q3 = stats['75%']
        max_val = stats['max']
        person_stats = {'name': person, 'count' : len(person_messages), 'percentage' : round(percentage, 2), 'polarity' : [min_val, q1, median, q3, max_val],'first_message' : {'message' : first['Message'], 'timeStamp' : str(first['DateTime'])}, 'emoji_stats' : person_emoji_stats}
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
        message = re.sub(r'http\S+|www.\S+', '', message)
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
        return dict(top_10)

    def analyse(self) -> None:
        message_count = len(self.data)
        self.export['total_messages'] = message_count
        
        # Detect language once for the entire chat
        all_messages = ' '.join(self.data['Message'].astype(str))
        language = self.detect_language(all_messages)
        
        # Apply sentiment analysis based on detected language
        self.data['sentiment'] = self.data['Message'].apply(
            lambda x: self.analyze_sentiment(x, language)
        )
        
        self.export['emoji_stats'] = self.analyze_emojis(self.data)

        persons = self.data.Sender.unique()
        self.export['people'] = [
            self.analyse_per_person(person, message_count) 
            for person in persons
        ]
        self.export['people'] = [
            self.analyse_per_person(person, message_count) 
            for person in persons
        ]
        self.export['time'] = self.analyse_time()
        self.export['words'] = self.get_top_10_words(self.data)

