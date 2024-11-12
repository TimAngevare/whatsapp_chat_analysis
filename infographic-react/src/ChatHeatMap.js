import React from 'react';
import Chart from "react-apexcharts";
import { Clock } from 'lucide-react'; // Importing the clock icon from lucide-react

const ChatHeatmap = ({ timeData }) => {
  // Transform the time data into the format ApexCharts expects
  const transformData = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return Array.from({ length: 24 }, (_, hour) => ({
      name: `${hour}:00`,
      data: Object.entries(timeData).map(([day, hours]) => ({
        x: days[parseInt(day) - 1],
        y: hours[hour] || 0
      }))
    }));
  };

  // Function to calculate the maximum value in timeData
  const getMaxValue = () => {
    let max = 0;
    for (const hours of Object.values(timeData)) {
      const hourMax = Math.max(...hours);
      if (hourMax > max) {
        max = hourMax;
      }
    }
    return max;
  };

  const maxValue = getMaxValue(); // Get the maximum value

  const options = {
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    title: {
      style: {
        color: '#ffffff'
      }
    },
    theme: {
      mode: 'dark'
    },
    xaxis: {
      labels: {
        style: {
          colors: '#ffffff'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff'
        }
      }
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges:  [
            {
              from: 0,
              to: Math.ceil(maxValue * 0.05), // 20% of max
              color: '#e0f7fa' // Light Blue for very low values
            },
            {
              from: Math.ceil(maxValue * 0.05),
              to: Math.ceil(maxValue * 0.1), // 40% of max
              color: '#e0f7fa' // Light Blue for very low values
            },
            {
              from: Math.ceil(maxValue * 0.1),
              to: Math.ceil(maxValue * 0.2), // 60% of max
              color: '#4fc3f7' // Blue for medium values
            },
            {
              from: Math.ceil(maxValue * 0.2),
              to: Math.ceil(maxValue * 0.4), // 80% of max
              color: '#039be5' // Dark Blue for high values
            },
            {
              from: Math.ceil(maxValue * 0.4),
              to: maxValue, // Max value
              color: '#01579b' // Navy Blue for very high values
            }
          ]
        }
      }
    }
  };

  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg relative">
      {/* Clock icon at the top right */}
      <Clock size={32} className="text-white absolute top-4 right-4" />

      <h2 className="text-2xl font-bold">Message Frequency</h2>
      <Chart
        options={options}
        series={transformData()}
        type="heatmap"
        height={550}
      />
    </div>
  );
};

export default ChatHeatmap;
