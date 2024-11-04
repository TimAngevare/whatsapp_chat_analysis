import React from "react";
import { Image} from 'lucide-react';

export default function MediaStats ({ people }) {
    return (
        <div className="bg-green-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              {/* Title and Icon */}
              <h2 className="text-2xl font-bold">Media Stats</h2>
              <Image size={32} className="text-purple-300"/> {/* Image icon next to the title */}
            </div>

            <div className="space-y-4">
              {people.map(person => (
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
    );
}