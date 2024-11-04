import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Text } from 'recharts';
import { Clock, MessageCircle, Smile, Calendar, Image} from 'lucide-react';
import personalData from './data.json';
import ChatHeatmap from './ChatHeatMap';
import AverageLengthChart from './AverageLengthChart';


export default function ChatAnalysisDashboard() {
  const [data, setData] = React.useState(personalData);

  const wordData = Object.entries(data.words)
    .map(([word, count]) => ({ word, count }))
    .slice(0, 5);

  // Custom label component for the message count bars
  const MessageCountLabel = ({ person, percentage, count }) => (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm text-white mb-1">{person}</span>
      <div className="flex items-center space-x-2 w-full ml-2">
        <div className="w-full bg-pink-700 rounded-full h-4">
          <div 
            className="bg-pink-400 rounded-full h-4"
            style={{ width: `${percentage * 100}%` }}
          />
        </div>
        <span className="text-sm whitespace-nowrap">{count}</span>
      </div>
    </div>
  );

  // Custom label component for Y axis
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <Text x={x} y={y} textAnchor="end" fill="#ffffff" dy={3}>
        {payload.value}
      </Text>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats */}
        <h2 className="text-2xl font-bold">The chat between {
          data.people.map((person, idx) => {
            if (idx + 1 == data.people.length && idx == 1 ){
              return ' and ' + person.name;
            } else if (idx > 0) {
              return ', ' + person.name;
            } else {
              return person.name;
            }
          })

          }</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <h2 className="text-2xl font-bold">Message Count</h2>
                <div className="mt-4 space-y-4">
                  {data.people.map(person => (
                    <MessageCountLabel
                      key={person.name}
                      person={person.name}
                      percentage={person.percentage}
                      count={person.count}
                    />
                  ))}
                </div>
              </div>
              <MessageCircle size={48} className="text-pink-300 ml-4" />
            </div>
          </div>

          <div className="bg-blue-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <h2 className="text-2xl font-bold">Top Words</h2>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={wordData} layout="vertical" margin={{ left: 50, right: 20 }}>
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="word"
                        tick={CustomYAxisTick}
                        width={50}
                      />
                      <Bar
                        dataKey="count"
                        fill="#93c5fd"
                        label={{
                          position: 'right',
                          fill: '#ffffff',
                          fontSize: 12
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your components remain the same */}
        <ChatHeatmap timeData={data.time} />

        {/* First Messages */}
        <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">First Messages</h2>
          <div className="space-y-4">
            {data.people.map(person => (
              <div key={person.name} className="bg-purple-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-purple-200">{person.name}</h3>
                    <p className="mt-2">{person.first_message.message}</p>
                  </div>
                  <span className="text-xs text-purple-300">{person.first_message.timeStamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emoji Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Emoji Usage</h2>
              <Smile size={32} className="text-indigo-300"/>
            </div>
            {data.people.map(person => (
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
            ))}
          </div>

          <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Total Stats</h2>
              <Clock size={32} className="text-purple-300"/>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-purple-700 rounded-lg p-4">
                <div className="text-3xl font-bold">{data.total_messages}</div>
                <div className="text-purple-300">Total Messages</div>
              </div>
              <div className="bg-purple-700 rounded-lg p-4">
                <div className="text-3xl font-bold">
                  {data.people.reduce((sum, p) => sum + p.emoji_stats.total_emoji_count, 0)}
                </div>
                <div className="text-purple-300">Total Emojis</div>
              </div>
            </div>
          </div>
          <div className="bg-green-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              {/* Title and Icon */}
              <h2 className="text-2xl font-bold">Media Stats</h2>
              <Image size={32} className="text-purple-300"/> {/* Image icon next to the title */}
            </div>

            <div className="space-y-4">
              {data.people.map(person => (
                  <div key={person.name} className="bg-green-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-green-200">{person.name}</h3>
                        <p className="mt-2">Pictures: {person.media_count.pictures || 0}</p>
                        <p className="mt-2">Stickers: {person.media_count.stickers || 0}</p>
                        <p className="mt-2">Audio Files: {person.media_count.audio_files || 0}</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <AverageLengthChart averageLengthData={data.people}/>
        </div>
      </div>
    </div>
  );
}