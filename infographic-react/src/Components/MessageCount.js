import React from "react";
import MessageCountLabel from "./MessageCountLabel";
import { MessageCircle } from 'lucide-react';

export default function MessageCount ({ people }) {
    return (
        <div className="bg-pink-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <h2 className="text-2xl font-bold">Message Count</h2>
                <div className="mt-4 space-y-4">
                  {people.map(person => (
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
    );
}