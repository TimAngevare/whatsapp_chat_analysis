import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Activity } from 'lucide-react'; // Using the Activity icon

// Register Chart.js components
Chart.register(...registerables);

export default function WeeklyMessageChart  ({ weeklyData }) {
  const chartRef = useRef(null);
  const [showChart, setShowChart] = useState(false); // State to control chart visibility

  // Prepare labels and dataset for the chart
  const labels = [];
  const dataset = [];

  let firstPositiveIndex = -1; // To store the index of the first positive value

  // Process the weekly data
  const processData = (data) => {
    Object.keys(data).forEach((year) => {
      Object.keys(data[year]).forEach((week) => {
        const weekDate = new Date(year, 0, 1 + (week - 1) * 7); // Get the first day of the week
        labels.push(weekDate.toISOString().split('T')[0]); // Store date in 'YYYY-MM-DD' format
        const count = data[year][week];
        dataset.push(count);

        // Set first positive index
        if (count > 0 && firstPositiveIndex === -1) {
          firstPositiveIndex = dataset.length - 1;
        }
      });
    });
  };

  // Process data if available
  if (weeklyData) {
    processData(weeklyData);
  }

  // Filter out future dates and slice the data from first positive index
  const filterData = (labels, dataset) => {
    const today = new Date();
    const slicedLabels = firstPositiveIndex !== -1 ? labels.slice(firstPositiveIndex) : [];
    const slicedDataset = firstPositiveIndex !== -1 ? dataset.slice(firstPositiveIndex) : [];

    const finalLabels = [];
    const finalDataset = [];

    for (let i = 0; i < slicedLabels.length; i++) {
      const labelDate = new Date(slicedLabels[i]);
      if (labelDate <= today) {
        finalLabels.push(slicedLabels[i]);
        finalDataset.push(slicedDataset[i]);
      }
    }

    return { finalLabels, finalDataset };
  };

  const { finalLabels, finalDataset } = filterData(labels, dataset);

  // Prepare chart data with updated colors
  const chartData = {
    labels: finalLabels,
    datasets: [
      {
        label: 'Messages Per Week',
        data: finalDataset,
        borderColor: '#FF6347', // Tomato color for better contrast
        backgroundColor: 'rgba(255, 99, 71, 0.2)', // Light tomato color for background
        fill: true,
        lineTension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#2c2c2c', // Darker grid lines for better visibility
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
          color: '#fff', // White ticks for better contrast
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
          color: '#fff', // White ticks for better contrast
        },
        grid: {
          color: '#2c2c2c', // Darker grid lines for better visibility
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff', // White legend labels for better contrast
        },
      },
    },
  };

  useEffect(() => {
    // Clean up chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-purple-600 rounded-lg p-6 shadow-lg relative">
      <h3 className="text-2xl font-bold text-white">Messages Per Week</h3>

      {/* Activity icon at the top-right */}
      <Activity size={32} className="text-purple-300 absolute top-4 right-4" />

      {finalDataset.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <div className="text-white">No messages to display yet.</div>
      )}
    </div>
  );
};
