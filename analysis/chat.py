import pandas as pd
import json
from zipfile import ZipFile 
import re
from collections import Counter
from pattern.nl import sentiment


class Chat:
    def __init__(self, filePath : str) -> None:
        self.filePath = filePath
        self.data = {'DateTime' : [], 'Sender' : [], 'Message' : []}
        self.pattern = re.compile(
    r'\[(\d{2}-\d{2}-\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)'
)
        self.export = {
            'total_messages' : 0,
            'people' : []
        }
    
    def read(self) -> None:
        with ZipFile(self.filePath, 'r') as file:
            file.extractall(path='./')
            with open('./_chat.txt', 'r', encoding='utf-8') as chat:
                #skip end-end encrypted message
                next(chat)
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
    
    def analyze_dutch_sentiment(self, text):
        polarity, subjectivity = sentiment(text)
        return polarity 

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
        # Calculate the statistics
        stats = person_messages['sentiment'].describe()

        # Extract the specific values we need
        min_val = stats['min']
        q1 = stats['25%']
        median = stats['50%']
        q3 = stats['75%']
        max_val = stats['max']
        person_stats = {'name': person, 'count' : len(person_messages), 'percentage' : round(percentage, 2), 'polarity' : [min_val, q1, median, q3, max_val],'first_message' : {'message' : first['Message'], 'timeStamp' : str(first['DateTime'])}}
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
    
    def get_top_10_words(self, df):
        # Define common Dutch stop words
        stop_words = set(['de', 'het', 'een', 'en', 'van', 'ik', 'te', 'dat', 'die', 'in', 'is', 'het', 'niet', 'zijn', 'je', 'hij'])
    
        # Combine all messages into a single string
        all_messages = ' '.join(df['Message'].astype(str))
    
        # Convert to lowercase
        all_messages = all_messages.lower()
    
        #  Remove punctuation and split into words
        words = re.findall(r'\w+', all_messages)
    
        # Remove stop words
        words = [word for word in words if word not in stop_words]
    
        # Count word frequencies
        word_counts = Counter(words)
        # Get the top 10 most common words
        top_10 = word_counts.most_common(10)
        words = {}
        for word, value in top_10:
            words[word] = value
        return words

    def analyse(self) -> None:
        message_count = len(self.data)
        self.export['total_messages'] = message_count
        self.data['sentiment'] = self.data['Message'].apply(self.analyze_dutch_sentiment)
        persons = self.data.Sender.unique()
        self.export['people'] = [self.analyse_per_person(person, message_count) for person in persons]
        self.export['time'] = self.analyse_time()
        self.export['words'] = self.get_top_10_words(self.data)

