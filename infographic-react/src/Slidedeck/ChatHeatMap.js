import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react'; // Import the icon

const ChatHeatmap = ({ timeData }) => {
  const margin = { top: 50, right: 50, bottom: 100, left: 100 };
  const width = 800;
  const height = 400;

  const days = Object.keys(timeData);
  const intervals = Object.keys(timeData[days[0]]);
  
  const data = days.flatMap(day =>
    intervals.map(interval => ({
      day,
      interval,
      value: timeData[day][interval]
    }))
  );

  const maxValue = Math.max(...data.map(d => d.value));
  const cellWidth = (width - margin.left - margin.right) / days.length;
  const cellHeight = (height - margin.top - margin.bottom) / intervals.length;

  const getColor = (value) => {
    const ratio = value / maxValue;
    const intensity = Math.floor(255 * (1 - ratio));
    return `rgb(${intensity}, ${intensity}, 255)`;
  };

  const formatValue = (value) => value.toFixed(1);

  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg relative" style={{ width: '100%', height: '500px' }}>
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-center w-full">Average Messages Per 6 Hours</h2>
        <Clock size={32} className="text-indigo-300" />
      </div>

      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <g transform={`translate(${margin.left}, 0)`}>
          <defs>
            <linearGradient id="legend-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0" stopColor="rgb(255, 255, 255)" />
              <stop offset="100" stopColor="rgb(0, 0, 255)" />
            </linearGradient>
          </defs>
          <rect width={200} height={20} fill="url(#legend-gradient)" stroke="#ccc" strokeWidth="1" />
          <text x={0} y={35} className="text-sm">0</text>
          <text x={200} y={35} textAnchor="end" className="text-sm">{(maxValue).toFixed(1)}</text>
        </g>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d, i) => {
            const x = days.indexOf(d.day) * cellWidth;
            const y = intervals.indexOf(d.interval) * cellHeight;
            return (
              <g key={`${d.day}-${d.interval}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellWidth - 2}
                  height={cellHeight - 2}
                  fill={getColor(d.value)}
                  stroke="#ffffff"
                  strokeWidth="1"
                >
                  <title>{`${d.day} ${d.interval}: ${formatValue(d.value)}`}</title>
                </rect>
                <text
                  x={x + cellWidth / 2}
                  y={y + cellHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium"
                  fill={d.value > 0.5 ? 'white' : 'black'}
                >
                  {formatValue(d.value)}
                </text>
              </g>
            );
          })}

          {days.map((day, i) => (
            <text
              key={`x-${day}`}
              x={i * cellWidth + cellWidth / 2}
              y={height - margin.bottom}
              textAnchor="middle"
              className="text-sm font-medium"
            >
              {day}
            </text>
          ))}

          {intervals.map((interval, i) => (
            <text
              key={`y-${interval}`}
              x={-10}
              y={i * cellHeight + cellHeight / 2}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-sm"
            >
              {interval}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ChatHeatmap;
