import React from "react";
import { BarChart } from 'lucide-react'; // Importing the statistics icon

export default function TotalStats({ data }) {

  const getTimeUnit = (totalMinutes) => {
    const weeks = Math.floor(totalMinutes / (1440 * 7));
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const mins = Math.floor(totalMinutes % 60);
  
    if (weeks > 0) {
      return `${weeks} weeks`;
    } else if (days > 0) {
      return `${days} days`;
    } else if (hours > 0) {
      return `${hours} hours`;
    } else {
      return `${mins} minutes`;
    }
  };

  return (
    <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Total Stats</h2>
        <BarChart size={32} className="text-purple-300"/> {/* Replaced Clock with BarChart */}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-purple-700 rounded-lg p-4">
          <div className="text-3xl font-bold">{data.total_messages}</div>
          <div className="text-purple-300">Messages</div>
        </div>
        <div className="bg-purple-700 rounded-lg p-4">
          <div className="text-3xl font-bold">
            {data.people.reduce((sum, p) => sum + p.emoji_stats.total_emoji_count, 0)}
          </div>
          <div className="text-purple-300">Emojis</div>
        </div>

         {/* Total Reading Time (from data.json) */}
        <div className="bg-purple-700 rounded-lg p-4">
          <div className="text-3xl font-bold">
            {getTimeUnit(data.reading_time)}
          </div>
          <div className="text-purple-300">Reading Time</div>
        </div>
        <div className="bg-purple-700 rounded-lg p-4">
          <div className="text-3xl font-bold">
            {data.total_urls}
          </div>
          <div className="text-purple-300">Urls sent</div>
        </div>
      </div>
    </div>
  );
}
