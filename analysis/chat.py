import pandas as pd
import json
from zipfile import ZipFile 
import re

class Chat:
    def __init__(self, filePath : str) -> None:
        self.filePath = filePath
        self.data = pd.DataFrame({'Date' : [], 'Time' : [], 'Sender' : [], 'Message' : []})
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
                content = chat.read()
        
        matches = self.pattern.findall(content)

        for match in matches:
            date, time, sender, message = match
            dataLine = {'Date' : date, 'Time' : time, 'Sender' : sender, 'Message' : message}
            self.data = self.data.append(dataLine, ignore_index=True)
    
    def getData(self) -> pd.DataFrame:
        return self.data
    
    def analyse_per_person(self, person : str, message_count) -> dict:
        person_messages = self.data[self.data.Sender==person]
        percentage = len(person_messages) / message_count
        person_stats = {'name': person, 'count' : len(person_messages), 'percentage' : percentage}
        return person_stats
    
    def analyse(self) -> None:
        message_count = len(self.data)
        self.export['total_messages'] = message_count
        persons = self.data.Sender.unique()
        self.export['people'] = [self.analyse_per_person(self, person, message_count) for person in persons]
    
