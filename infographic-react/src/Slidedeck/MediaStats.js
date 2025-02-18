import React from "react";
import { Image } from 'lucide-react';

export default function MediaStats({ people }) {
  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg flex flex-col justify-between h-full">
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white text-center w-full">Media Stats</h2>
        <Image size={32} className="text-purple-300" />
      </div>

      {/* Media Stats Section */}
      <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
        {people.map(person => (
          <div key={person.name} className="bg-green-700/50 rounded-lg p-6 flex flex-col justify-between h-full">
            <h3 className="text-xl font-bold text-green-100 mb-4">{person.name}</h3>
            <div className="flex flex-col space-y-3">
              <p className="text-lg font-semibold text-green-200">Pictures: <span className="font-extrabold text-white">{person.media_count.pictures || 0}</span></p>
              <p className="text-lg font-semibold text-green-200">Stickers: <span className="font-extrabold text-white">{person.media_count.stickers || 0}</span></p>
              <p className="text-lg font-semibold text-green-200">Audio Files: <span className="font-extrabold text-white">{person.media_count.audio_files || 0}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
