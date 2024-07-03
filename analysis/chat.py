import pandas as pd
import json
from zipfile import ZipFile 
import re

class chat:
    def __init__(self, filePath : str) -> None:
        self.filePath = filePath
        self.data = pd.DataFrame({'Date' : [], 'Time' : [], 'Sender' : [], 'Message' : []})
        self.pattern = re.compile(
    r'\[(\d{2}-\d{2}-\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)'
)
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
    
    def analyse(self):
        pass
    
