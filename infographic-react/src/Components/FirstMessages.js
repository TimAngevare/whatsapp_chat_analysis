import React from 'react';
import { History } from 'lucide-react'; // Importing the History icon

export default function FirstMessages({ people }) {
  return (
    <div className="bg-purple-600 rounded-lg p-6 shadow-lg relative">
      {/* History icon at the top right */}
      <History size={32} className="text-white absolute top-4 right-4" />

      <h2 className="text-2xl font-bold text-center w-full mb-4">First Messages</h2>
      <div className="space-y-4">
        {people.map(person => (
          <div key={person.name} className="bg-purple-700/50 rounded-lg p-4 w-full flex flex-col h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-medium text-purple-200">{person.name}</h3>
                <p className="mt-2">{person.first_message.message}</p>
              </div>
              <span className="text-xs text-purple-300 self-end mt-auto">{person.first_message.timeStamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
