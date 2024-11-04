import React from "react";
import { Smile } from 'lucide-react';

export default function EmojiStats ({ people }) {
    return (
        <div className="bg-indigo-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Emoji Usage</h2>
              <Smile size={32} className="text-indigo-300"/>
            </div>
            {people.map(person => (
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
    );
}