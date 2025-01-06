import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Activity } from 'lucide-react';

export default function WeeklyMessageChart({ weeklyData }) {
  const chartRef = useRef(null);

  // Labels and dataset initialization
  const labels = [];
  const dataset = [];

  // If weeklyData exists, proceed with populating labels and dataset
  if (weeklyData) {
    const allWeeks = Object.keys(weeklyData);
    const firstWeek = allWeeks.reduce((a, b) => (a < b ? a : b)); // Get the earliest week
    const lastWeek = allWeeks.reduce((a, b) => (a > b ? a : b));  // Get the latest week

    // Generate the weeks from first to last, and fill missing weeks with 0
    let currentWeek = firstWeek;
    while (currentWeek <= lastWeek) {
      labels.push(currentWeek); // Add the week as label
      dataset.push(weeklyData[currentWeek] || 0); // Add 0 if week is missing

      // Get the next week (handle week numbering)
      const [year, week] = currentWeek.split('-').map(Number);
      const nextWeekDate = new Date(year, 0, (week - 1) * 7); // Start of the current week
      nextWeekDate.setDate(nextWeekDate.getDate() + 7); // Move to the next week
      currentWeek = `${nextWeekDate.getFullYear()}-${String(nextWeekDate.getWeek()).padStart(2, '0')}`;
    }
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
