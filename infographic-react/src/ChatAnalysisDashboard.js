import React, { useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Clock, MessageCircle, Smile, Calendar } from 'lucide-react';
import personalData from './data.json';

export default function ChatAnalysisDashboard() {
  const [data, setData] = React.useState(personalData);
  console.log(data);

  const wordData = Object.entries(data.words)
    .map(([word, count]) => ({ word, count }))
    .slice(0, 5);

  console.log(wordData);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Message Count</h2>
                <div className="mt-4 space-y-2">
                  {data.people.map(person => (
                    <div key={person.name} className="flex items-center space-x-2">
                      <div className="w-full bg-pink-700 rounded-full h-4">
                        <div 
                          className="bg-pink-400 rounded-full h-4"
                          style={{ width: `${person.percentage * 100}%` }}
                        />
                      </div>
                      <span className="text-sm whitespace-nowrap">{person.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <MessageCircle size={48} className="text-pink-300" />
            </div>
          </div>

          <div className="bg-blue-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Top Words</h2>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={wordData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="word" width={50} />
                      <Bar dataKey="count" fill="#93c5fd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        Message Heatmap
        <div className="bg-green-600 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Message Frequency</h2>
            <Calendar size={32} className="text-green-300" />
          </div>
          <div className="grid grid-cols-24 gap-1">
            {/* {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="text-xs rotate-90 whitespace-nowrap text-green-300">
                {`${i}:00`}
              </div>
            ))}
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              Array.from({ length: 24 }).map((_, hour) => {
                const cellData = heatmapData.find(d => d.day === day && d.hour === `${hour}:00`);
                const intensity = cellData ? (cellData.value / maxValue) : 0;
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `rgba(134, 239, 172, ${intensity})`
                    }}
                    title={`${day} ${hour}:00 - ${cellData?.value || 0} messages`}
                  />
                );
              })
            ))} */}
          </div>
          <div className="grid grid-cols-7 mt-2">
            {/* {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center text-xs text-green-300">{day}</div>
            ))} */}
          </div>
        </div>

        {/* First Messages */}
        <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">First Messages</h2>
          <div className="space-y-4">
            {/* {data.people.map(person => (
              <div key={person.name} className="bg-purple-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-purple-200">{person.name}</h3>
                    <p className="mt-2">{person.first_message.message}</p>
                  </div>
                  <span className="text-xs text-purple-300">{person.first_message.timeStamp}</span>
                </div>
              </div>
            ))} */}
          </div>
        </div>

        {/* Emoji Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Emoji Usage</h2>
              <Smile size={32} className="text-indigo-300" />
            </div>
            {/* {data.people.map(person => (
              <div key={person.name} className="mb-4">
                <h3 className="font-medium mb-2">{person.name}</h3>
                <div className="space-y-2">
                  {Object.entries(person.emoji_stats.top_emojis).map(([emoji, count]) => (
                    <div key={emoji} className="flex items-center space-x-2">
                      <span className="text-xl">{emoji}</span>
                      <div className="flex-1 bg-indigo-700 rounded-full h-2">
                        <div 
                          className="bg-indigo-400 rounded-full h-2"
                          style={{ 
                            width: `${(count / Math.max(...Object.values(person.emoji_stats.top_emojis))) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))} */}
          </div>

          <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Total Stats</h2>
              <Clock size={32} className="text-purple-300" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-purple-700 rounded-lg p-4">
                <div className="text-3xl font-bold">{data.total_messages}</div>
                <div className="text-purple-300">Total Messages</div>
              </div>
              <div className="bg-purple-700 rounded-lg p-4">
                {/* <div className="text-3xl font-bold">
                  {data.people.reduce((sum, p) => sum + p.emoji_stats.total_emoji_count, 0)}
                </div> */}
                <div className="text-purple-300">Total Emojis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}