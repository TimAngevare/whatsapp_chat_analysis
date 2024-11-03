import React from 'react';
import Chart from "react-apexcharts";

const ChatHeatmap = ({ timeData }) => {
  // Transform the time data into the format ApexCharts expects
  const transformData = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Create series data where each series represents an hour
    return Array.from({ length: 24 }, (_, hour) => ({
      name: `${hour}:00`,
      data: Object.entries(timeData).map(([day, hours]) => ({
        x: days[parseInt(day) - 1],
        y: hours[hour] || 0
      }))
    }));
  };

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
    colors: ["#7cc4ff"], // Green color to match your theme
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
          ranges: [{
            from: 0,
            to: 0,
            color: '#16a34a20'
          }]
        }
      }
    }
  };

  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold">Message Frequency</h2>
        <Chart 
            options={options}
            series={transformData()}
            type="heatmap"
            height={350}
        />
    </div>
  );
};

export default ChatHeatmap;