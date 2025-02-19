import React from 'react';
import Chart from 'react-apexcharts';
import { CaseUpperIcon } from 'lucide-react';

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
        borderRadius: 20, // Rounded corners for bars
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
      style: {
        color: '#ffffff',
        fontSize: '1.25rem', // Slightly smaller title size
        fontWeight: 'bold',
        marginBottom: '1rem' // Added space between the title and chart
      }
    }
  };

  return (
    <div className="bg-secondary rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        {/* Title centered */}
        <h2 className="text-2xl font-bold text-white w-full text-center">Average Message Length</h2>
        <CaseUpperIcon className="" size={32} />
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
