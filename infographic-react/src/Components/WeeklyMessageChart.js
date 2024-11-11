import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import weeklyData from './data.json';

// Register all necessary components (scales, elements, etc.)
Chart.register(...registerables);

const WeeklyMessageChart = () => {
  const chartRef = useRef(null); // Ref to hold the chart instance
  const [showChart, setShowChart] = useState(false); // State to control chart visibility

  console.log('Weekly Data:', weeklyData); // Log the data to the console
  const data = weeklyData.weekly_message_counts;

  // Prepare labels and dataset for the chart
  const labels = [];
  const dataset = [];
  let firstPositiveIndex = -1; // To store the index of the first positive value

  // Check if data is available and process it
  if (data) {
    Object.keys(data).forEach(year => {
      Object.keys(data[year]).forEach(week => {
        const weekDate = new Date(year, 0, 1 + (week - 1) * 7); // Get the first day of the week
        labels.push(weekDate.toISOString().split('T')[0]); // Store date in 'YYYY-MM-DD' format
        const count = data[year][week];
        dataset.push(count);

        // Set the firstPositiveIndex if a positive count is found and not already set
        if (count > 0 && firstPositiveIndex === -1) {
          firstPositiveIndex = dataset.length - 1; // Store the current index
        }
      });
    });
  }

  // Determine the current date
  const today = new Date();

  // Slice the labels and dataset from the first positive index
  const slicedLabels = firstPositiveIndex !== -1 ? labels.slice(firstPositiveIndex) : [];
  const slicedDataset = firstPositiveIndex !== -1 ? dataset.slice(firstPositiveIndex) : [];

  // Filter out any future dates
  const finalLabels = [];
  const finalDataset = [];
  for (let i = 0; i < slicedLabels.length; i++) {
    const labelDate = new Date(slicedLabels[i]);
    if (labelDate <= today) {
      finalLabels.push(slicedLabels[i]);
      finalDataset.push(slicedDataset[i]);
    }
  }

  // Only create chart data if there is data
  const chartData = {
    labels: finalLabels,
    datasets: [
      {
        label: 'Messages Per Week',
        data: finalDataset,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
    <div>
      <h3>Messages Per Week</h3>
      {finalDataset.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <div>No messages to display yet.</div> // Message before any positive count is found
      )}
    </div>
  );
};

export default WeeklyMessageChart;
