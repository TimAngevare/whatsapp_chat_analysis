import React from 'react';

export default function FirstMessages ({people}) {
    return (
        <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">First Messages</h2>
          <div className="space-y-4">
            {people.map(person => (
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
    );
}