import pandas as pd
import json
from zipfile import ZipFile 
import re

class Chat:
    def __init__(self, filePath : str) -> None:
        self.filePath = filePath
        self.data = pd.DataFrame({'DateTime' : [], 'Sender' : [], 'Message' : []})
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
            dataLine = {'DateTime' : pd.to_datetime(date + ' ' + time, format='%d-%m-%Y %H:%M:%S'), 'Sender' : sender, 'Message' : message}
            self.data = self.data.append(dataLine, ignore_index=True)
    
    def getData(self) -> pd.DataFrame:
        return self.data
    
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
        person_stats = {'name': person, 'count' : len(person_messages), 'percentage' : round(percentage, 2), 'first_message' : {'message' : first['Message'], 'timeStamp' : str(first['DateTime'])}}
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
    
    
    def analyse(self) -> None:
        message_count = len(self.data)
        self.export['total_messages'] = message_count
        persons = self.data.Sender.unique()
        self.export['people'] = [self.analyse_per_person(person, message_count) for person in persons]
        self.export['time'] = self.analyse_time()

