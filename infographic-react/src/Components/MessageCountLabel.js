import React from "react";

export default function MessageCountLabel ({ person, percentage, count }) {
    return (
        <div className="flex items-center w-full mb-2">
            {/* Fixed width for the name column */}
            <span className="text-sm text-white w-1/6">{person}</span>

            {/* Stat bar and count */}
            <div className="flex items-center space-x-2 w-3/4">
                <div className="w-full rounded-full h-8">
                    <div
                        className="rounded-full h-8"
                        style={{ width: `${percentage * 100}%` }}
                    />
                </div>
                <span className="text-sm whitespace-nowrap">{count}</span>
            </div>
        </div>
    );
}
