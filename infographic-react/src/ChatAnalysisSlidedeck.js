import React, { useState, useEffect } from 'react';
import ChatHeatmap from './Slidedeck/ChatHeatMap';
import AverageLengthChart from './Slidedeck/AverageLengthChart';
import FirstMessages from './Slidedeck/FirstMessages';
import MessageCount from './Slidedeck/MessageCount';
import TopWords from './Slidedeck/TopWords';
import EmojiStats from './Slidedeck/EmojiStats';
import TotalStats from './Slidedeck/TotalStats';
import MediaStats from './Slidedeck/MediaStats';
import WeeklyMessageChart from './Slidedeck/WeeklyMessageChart';

export default function ChatAnalysisSlideDeck() {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('data.json');  
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching chat data:', error);
        }
      }

      fetchData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    const wordData = Object.entries(data.words)
      .map(([word, count]) => ({ word, count }))
      .slice(0, 5);

    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Chat Analysis Dashboard</h2>

        <div className="space-y-6">
          <div
            className="slide bg-gray-800 flex justify-center items-center"
            style={{ width: '1920px', height: '1280px' }}
          >
            <h2 className="text-3xl font-bold">
              The chat between {data.people.map((person, idx) => (
                idx + 1 === data.people.length && idx === 1
                  ? ' and ' + person.name
                  : idx > 0 ? ', ' + person.name : person.name
              ))}
            </h2>
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <MessageCount people={data.people} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <TopWords wordData={wordData} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <ChatHeatmap timeData={data.time} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <EmojiStats people={data.people} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <TotalStats data={data} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <MediaStats people={data.people} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <AverageLengthChart averageLengthData={data.people} />
          </div>

          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <FirstMessages people={data.people} />
          </div>
          {/* Uncomment the WeeklyMessageChart if needed */}
          <div
            className="slide"
            style={{ width: '1920px', height: '1280px' }}
          >
            <WeeklyMessageChart weeklyData={data.weekly_message_counts} />
          </div>
        </div>
      </div>
    );
}
