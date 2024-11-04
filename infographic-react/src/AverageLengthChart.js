import React from 'react';
import Chart from 'react-apexcharts';
import {CaseUpperIcon } from 'lucide-react';
const AverageLengthChart = ({ averageLengthData }) => {
  const transformData = () => {
    return averageLengthData.map(person => ({
      x: person.name,
      y: parseFloat(person.average_message_length.toFixed(1)) // Average length rounded to one decimal
    }));
  };

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        colors: {
          ranges: [{
            from: 0,
            to: 100, // Adjust based on your expected average message length
            color: '#7cc4ff'
          }]
        }
      }
    },
    xaxis: {
      title: {
        text: 'Average Message Length (Characters)',
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        style: {
          colors: '#ffffff'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Participants',
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        style: {
          colors: '#ffffff'
        }
      }
    },
    theme: {
      mode: 'dark'
    },
    title: {
      text: 'Average Message Length per Person',
      style: {
        color: '#ffffff'
      }
    }
  };

  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        {/* Title and Icon */}
        <h2 className="text-2xl font-bold">Average Message Length</h2>
        <CaseUpperIcon className="text-green-300" size={32} /> {/* Icon for Message Length */}
      </div>

      <Chart
        options={options}
        series={[{
          name: 'Length',
          data: transformData()
        }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default AverageLengthChart;
