import React from "react";
import { BarChart, MessageCircle, Smile, Clock, Link } from 'lucide-react'; // Importing appropriate icons

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
    <div className="bg-gradient-to-r from-purple-700 to-indigo-600 rounded-lg p-6 shadow-lg">
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white w-full text-center">Total Stats</h2>
        <BarChart size={32} className="text-purple-300"/>
      </div>

      {/* Stats Section - 2x2 Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 h-[400px]">
        {/* Messages Card */}
        <div className="bg-purple-800 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl h-full">
          <MessageCircle size={40} className="text-purple-300 mb-2" />
          <div className="text-3xl font-bold text-white">{data.total_messages}</div>
          <div className="text-purple-300">Messages</div>
        </div>

        {/* Emojis Card */}
        <div className="bg-purple-800 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl h-full">
          <Smile size={40} className="text-purple-300 mb-2" />
          <div className="text-3xl font-bold text-white">
            {data.people.reduce((sum, p) => sum + p.emoji_stats.total_emoji_count, 0)}
          </div>
          <div className="text-purple-300">Emojis</div>
        </div>

        {/* Reading Time Card */}
        <div className="bg-purple-800 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl h-full">
          <Clock size={40} className="text-purple-300 mb-2" />
          <div className="text-3xl font-bold text-white">{getTimeUnit(data.reading_time)}</div>
          <div className="text-purple-300">Reading Time</div>
        </div>

        {/* URLs Sent Card */}
        <div className="bg-purple-800 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl h-full">
          <Link size={40} className="text-purple-300 mb-2" />
          <div className="text-3xl font-bold text-white">{data.total_urls}</div>
          <div className="text-purple-300">Urls Sent</div>
        </div>
      </div>
    </div>
  );
}
