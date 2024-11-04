import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Text } from 'recharts';

export default function TopWords ({ wordData }) {

    // Custom label component for the message count bars

  // Custom label component for Y axis
    const CustomYAxisTick = (props) => {
        const { x, y, payload } = props;
        return (
        <Text x={x} y={y} textAnchor="end" fill="#ffffff" dy={3}>
            {payload.value}
        </Text>
        );
    };
    return (
        <div className="bg-blue-600 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <h2 className="text-2xl font-bold">Top Words</h2>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={wordData} layout="vertical" margin={{ left: 50, right: 20 }}>
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="word"
                        tick={CustomYAxisTick}
                        width={50}
                      />
                      <Bar
                        dataKey="count"
                        fill="#93c5fd"
                        label={{
                          position: 'right',
                          fill: '#ffffff',
                          fontSize: 12
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
    );
}