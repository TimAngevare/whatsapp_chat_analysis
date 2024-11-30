import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {Clock } from 'lucide-react'; // Import the icon

const ChatHeatmap = ({ timeData }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    // Increased the left margin to accommodate Y-axis labels
    const margin = { top: 50, right: 50, bottom: 100, left: 120 };

    // Select the SVG element and clear any previous content
    const svgElement = d3.select(heatmapRef.current);
    svgElement.selectAll('*').remove(); // Clear all previous elements

    // Get container dimensions for dynamic resizing
    const containerWidth = svgElement.node().getBoundingClientRect().width;
    const containerHeight = svgElement.node().getBoundingClientRect().height;

    // Adjust width and height by subtracting margin
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = svgElement
      .attr('width', '100%') // Set width to 100% of container
      .attr('height', '100%') // Set height to 100% of container
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define 6-hour intervals and days of the week
    const intervals = ['00:00–06:00', '06:00–12:00', '12:00–18:00', '18:00–24:00'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Transform timeData into grouped data
    const groupIntoSixHourIntervals = (hours) => {
      const sixHourBins = Array(4).fill(0);
      hours.forEach((count, hour) => {
        const binIndex = Math.floor(hour / 6);
        sixHourBins[binIndex] += count;
      });
      return sixHourBins;
    };

    const data = [];
    Object.entries(timeData).forEach(([day, hours], dayIndex) => {
      const grouped = groupIntoSixHourIntervals(hours);
      grouped.forEach((count, intervalIndex) => {
        data.push({ day: days[dayIndex], interval: intervals[intervalIndex], count });
      });
    });

    // Scales (Swapped axes)
    const xScale = d3.scaleBand()
      .domain(days) // X-axis now represents days
      .range([0, width]) // Fill entire width
      .padding(0.1);

    const yScale = d3.scaleBand()
      .domain(intervals) // Y-axis still represents intervals
      .range([height, 0]) // Reverse the range to flip the axis
      .padding(0.1);

    const maxCount = d3.max(data, d => d.count);

    // Define a smooth, gradual color scale
    const colorScale = d3.scaleSequential(d3.interpolateRgb("white", "red"))
      .domain([0, maxCount]);

    // Draw circles (Swapped cx and cy)
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.day) + xScale.bandwidth() / 2) // Centered on the x-axis (days)
      .attr('cy', d => yScale(d.interval) + yScale.bandwidth() / 2) // Centered on the y-axis (intervals)
      .attr('r', d => Math.min(xScale.bandwidth(), yScale.bandwidth()) / 2) // Larger circles
      .style('fill', d => colorScale(d.count))
      .style('stroke', '#ffffff')
      .style('stroke-width', 1);

    // Add axes (Swapped positions)
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale)); // Days on the bottom

    svg.append('g')
      .call(d3.axisLeft(yScale)); // Intervals on the left

    // Add Legend (Position it differently)
    const legendWidth = 300;  // Adjust width of the legend
    const legendHeight = 20;  // Adjust height of the legend


    // Move the legend to the bottom of the heatmap
    const legend = svgElement.append('g')
      .attr('transform', `translate(${margin.left + width / 2 - legendWidth / 2}, ${margin.top + height + 30})`); // Positioned below the chart

    const legendScale = d3.scaleLinear()
      .domain([0, maxCount])  // Corresponds to the data range
      .range([0, legendWidth]);

    // Append gradient for the legend
    legend.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'white' },
        { offset: '100%', color: 'red' }
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#gradient)');

    // Add legend axis
    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(d3.axisBottom(legendScale).ticks(5)); // 5 ticks for the legend

  }, [timeData]);

  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg relative" style={{ width: '100%', height: '500px' }}>
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-center w-full">Message Frequency</h2> {/* Title */}
        <Clock size={32} className="text-indigo-300" /> {/* Icon */}
      </div>

      {/* Heatmap */}
      <svg ref={heatmapRef} />

      {/* You can also position your legend below the chart */}
    </div>
  );
};

export default ChatHeatmap;
