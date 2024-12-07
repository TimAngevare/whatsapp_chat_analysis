import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Clock } from 'lucide-react'; // Import the icon

const ChatHeatmap = ({ timeData }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 100, left: 120 };

    // Select the SVG element and clear previous content
    const svgElement = d3.select(heatmapRef.current);
    svgElement.selectAll('*').remove();

    const containerWidth = svgElement.node().getBoundingClientRect().width;
    const containerHeight = svgElement.node().getBoundingClientRect().height;

    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = svgElement
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Extract days and intervals dynamically
    const days = Object.keys(timeData);
    const intervals = Object.keys(timeData[days[0]]);

    // Transform timeData into usable data for D3
    const data = [];
    days.forEach((day) => {
      intervals.forEach((interval) => {
        data.push({
          day,
          interval,
          count: timeData[day][interval],
        });
      });
    });

    // Scales
    const xScale = d3.scaleBand()
      .domain(days)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleBand()
      .domain(intervals)
      .range([height, 0]) // Reverse to match Y-axis direction
      .padding(0.1);

    const maxCount = d3.max(data, (d) => d.count);

    const colorScale = d3.scaleSequential(d3.interpolateRgb('white', 'red')).domain([0, maxCount]);

    // Draw circles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.day) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d.interval) + yScale.bandwidth() / 2)
      .attr('r', (d) => Math.min(xScale.bandwidth(), yScale.bandwidth()) / 2)
      .style('fill', (d) => colorScale(d.count))
      .style('stroke', '#ffffff')
      .style('stroke-width', 1);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Legend
    const legendWidth = 300;
    const legendHeight = 20;

    const legend = svgElement.append('g')
      .attr('transform', `translate(${margin.left + width / 2 - legendWidth / 2}, ${margin.top + height + 30})`);

    const legendScale = d3.scaleLinear().domain([0, maxCount]).range([0, legendWidth]);

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
        { offset: '100%', color: 'red' },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#gradient)');

    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(d3.axisBottom(legendScale).ticks(5));
  }, [timeData]);

  return (
    <div className="bg-green-600 rounded-lg p-6 shadow-lg relative" style={{ width: '100%', height: '500px' }}>
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-center w-full">Average Messages Per Interval</h2>
        <Clock size={32} className="text-indigo-300" />
      </div>

      {/* Heatmap */}
      <svg ref={heatmapRef} />
    </div>
  );
};

export default ChatHeatmap;
