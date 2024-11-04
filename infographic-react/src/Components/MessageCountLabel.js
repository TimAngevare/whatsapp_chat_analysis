import React from "react";

export default function MessageCountLabel ({ person, percentage, count }) {
    return (
        <div className="flex items-center justify-between w-full">
            <span className="text-sm text-white mb-1">{person}</span>
            <div className="flex items-center space-x-2 w-full ml-2">
                <div className="w-full bg-pink-700 rounded-full h-4">
                    <div
                        className="bg-pink-400 rounded-full h-4"
                        style={{ width: `${percentage * 100}%` }}
                    />
                </div>
                <span className="text-sm whitespace-nowrap">{count}</span>
            </div>
        </div>
    );
}