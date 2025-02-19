import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Activity } from 'lucide-react';

// Import necessary Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function WeeklyMessageChart({ weeklyData }) {
  const chartRef = useRef(null);

  // Labels and dataset initialization
  const labels = [];
  const dataset = [];

  // If weeklyData exists, proceed with populating labels and dataset
  if (weeklyData) {
    const allWeeks = Object.keys(weeklyData);
    const sortedWeeks = allWeeks.sort(); // Sort the weeks for correct chronological order

    // Generate the labels and dataset for chart
    sortedWeeks.forEach((week) => {
      labels.push(week); // Add the week as label
      dataset.push(weeklyData[week]); // Add the count for the respective week
    });
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Messages Per Week',
        data: dataset,
        borderColor: '#FF6347',
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
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
      },
      x: {
        ticks: {
          maxRotation: 45,
          autoSkip: true,
        },
      },
    },
  };

  // Cleanup old chart instance when data changes
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [weeklyData]);

  return (
    <div className="bg-purple-600 rounded-lg p-6 shadow-lg relative">
      <h3 className="text-2xl font-bold text-white">Messages Per Week</h3>
      <Activity size={32} className="text-purple-300 absolute top-4 right-4" />
      {dataset.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <div className="text-white">No messages to display yet.</div>
      )}
    </div>
  );
}