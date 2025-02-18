import React from "react";
import MessageCountLabel from "./MessageCountLabel";
import { MessageCircle } from 'lucide-react';

export default function MessageCount ({ people }) {
    return (
        <div className="bg-pink-600 rounded-lg p-6 shadow-lg relative min-h-[300px] flex flex-col">
            <MessageCircle size={32} className="text-pink-300 absolute top-4 right-4" />

            {/* Title at the top */}
            <h2 className="text-2xl font-bold mb-4">Message Count</h2>

            {/* Center the chart area */}
            <div className="flex-grow flex items-center justify-center">
                <div className="space-y-4 w-full">
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
        </div>
    );
}
