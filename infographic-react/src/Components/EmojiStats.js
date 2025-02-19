import React from "react";
import { Smile } from 'lucide-react';

export default function EmojiStats({ people }) {
  return (
    <div className="bg-secondary rounded-lg p-6 shadow-lg">
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-center w-full">Top Emojis Usage</h2> {/* Updated title */}
        <Smile size={32} className="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {people.map((person) => (
          <div key={person.name} className="space-y-4">
            <h3 className="font-medium text-lg text-white mb-2">{person.name}</h3>
            <div className="space-y-4">
                {Object.entries(person.emoji_stats.top_emojis).map(([emoji, count]) => (
                  <div key={emoji} className="flex items-center space-x-4">
                    <span className="text-3xl">{emoji}</span>
                    <div className="flex-1 rounded-full h-2">
                      <div
                        className="rounded-full h-2"
                        style={{
                          width: `${
                            (count / Math.max(...Object.values(person.emoji_stats.top_emojis))) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-white">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
