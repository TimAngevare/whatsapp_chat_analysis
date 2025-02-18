import React, { useState, useEffect } from 'react';
//import personalData from './data.json';
import ChatHeatmap from './Components/ChatHeatMap';
import AverageLengthChart from './Components/AverageLengthChart';
import FirstMessages from './Components/FirstMessages';
import MessageCount from './Components/MessageCount';
import TopWords from './Components/TopWords';
import EmojiStats from './Components/EmojiStats';
import TotalStats from './Components/TotalStats';
import MediaStats from './Components/MediaStats';
import WeeklyMessageChart from './Components/WeeklyMessageChart';

export default function ChatAnalysisDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data.json');  // Replace with your actual API URL
        const result = await response.json();
        setData(result);
        setTheme();

      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    }

    fetchData();
  }, []);

  const setTheme = () => {
    var theme = data.theme
    if (theme){
      var r = document.querySelector(':root');
      r.style.setProperty('--primary-color', theme.primary);
      r.style.setProperty('--secondary-color', theme.secondary);
      r.style.setProperty('--tertiary-color', theme.tertiary);
      r.style.setProperty('--fourth-color', theme.fourth);
    }
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const wordData = Object.entries(data.words)
    .map(([word, count]) => ({ word, count }))
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats */}
        <h2 className="text-3xl font-bold" id='title'>The chat between {
          data.people.map((person, idx) => {
            if (idx + 1 === data.people.length && idx === 1) {
              return ' and ' + person.name;
            } else if (idx > 0) {
              return ', ' + person.name;
            } else {
              return person.name;
            }
          })
        }</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Message Count Bars */}
          <MessageCount people={data.people} />
          <TopWords wordData={wordData} />
        </div>

        <ChatHeatmap timeData={data.time} />


        {/* First Messages */}


        <EmojiStats people={data.people} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TotalStats data={data} />
          <MediaStats people={data.people} />
          <AverageLengthChart averageLengthData={data.people} />
          <FirstMessages people={data.people} />
        </div>
        <WeeklyMessageChart weeklyData={data.weekly_message_counts} />
      </div>
    </div>
  );
}
