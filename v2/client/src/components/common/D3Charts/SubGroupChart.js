import React, { Component } from 'react';
import * as d3 from 'd3';
import { colors } from './constants';
import { wrapText } from './helpers';

class SubGroupChart extends Component {
  componentDidMount() {
    const { title, subtitile, subGroup, i, k, legends } = this.props;
    const barWidth = 30;
    const chartWidth = legends.length * barWidth;
    const chartHeight = 250;
    const margin = { top: 40, right: 10, bottom: 40, left: 10 };

    const bandScale = d3
      .scaleBand()
      .domain(subGroup.categories.map(_i => _i.category))
      .range([0, chartWidth]);

    // for bars colors
    const ordinalScale = d3
      .scaleOrdinal()
      .domain(legends)
      .range(colors.slice(0, legends.length));

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, chartHeight - margin.top - margin.bottom]);

    const svg = d3
      .select(`#chart-sub-groups-${k}-${i}`)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('style', 'display: block; margin: 25px auto');

    // bars groups
    const groups = svg
      .selectAll(`.chart-sub-groups-${k}-${i}-g`)
      .data(subGroup.categories)
      .enter()
      .append('g')
      .attr('class', `chart-sub-groups-${k}-${i}-g`);

    // empty bars
    groups
      .append('rect')
      .attr('width', bandScale.bandwidth())
      .attr('x', d => bandScale(d.category))
      .attr('height', chartHeight - margin.top - margin.bottom)
      .attr('y', margin.top)
      .attr('fill', 'none')
      .attr('stroke', '#F2F2F2')
      .attr('stroke-width', 2);

    // filled bars
    groups
      .append('rect')
      .attr('width', bandScale.bandwidth())
      .attr('x', d => bandScale(d.category))
      .attr('height', d => yScale(d.value))
      .attr('y', d => chartHeight - margin.top - yScale(d.value))
      .attr('fill', d => ordinalScale(d.category));

    // red lines
    groups
      .append('line')
      .attr('stroke', d => (d.value && d.average ? `red` : 'none'))
      .attr('stroke-width', 1)
      .attr('x1', d => bandScale(d.category))
      .attr('y1', d => chartHeight - margin.top - yScale(d.average))
      .attr('x2', d => bandScale(d.category) + bandScale.bandwidth())
      .attr('y2', d => chartHeight - margin.top - yScale(d.average));

    // no data text
    groups
      .append('text')
      .text('No data yet')
      .attr('fill', '#828282')
      .attr('opacity', d => (d.value ? 0 : 0.7))
      .attr('x', d => bandScale(d.category) + bandScale.bandwidth() / 2)
      .attr('y', (chartHeight - margin.top - margin.bottom) / 2)
      .attr('writing-mode', 'tb')
      .attr('text-anchor', 'end')
      .attr(
        'transform',
        d =>
          `rotate(180 ${bandScale(d.category) +
            bandScale.bandwidth() / 2}, ${(chartHeight -
            margin.top -
            margin.bottom) /
            2})`
      );

    const rates = svg
      .selectAll(`.chart-sub-groups-${k}-${i}-text`)
      .data(subGroup.categories)
      .enter()
      .append('text')
      .text(d => `${Math.round(d.value)}%`)
      .attr('class', `chart-sub-groups-${k}-${i}-text`)
      .attr('text-anchor', 'middle')
      .attr('opacity', d => (d.value * 0.8) / 100 + 0.2)
      .attr('x', d => bandScale(d.category) + bandScale.bandwidth() / 2)
      .attr('y', margin.top / 2)
      .attr('writing-mode', 'tb')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        d =>
          `rotate(180 ${bandScale(d.category) +
            bandScale.bandwidth() / 2}, ${margin.top / 2 - 2})`
      );

    const chartTitle = svg
      .selectAll(`.chart-sub-groups-${k}-${i}-title`)
      .data([title])
      .enter()
      .append('text')
      .text(d => d)
      .attr('text-anchor', 'middle')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight - margin.bottom / 2)
      .attr('width', 100)
      .attr('height', 10)
      .call(wrapText, chartWidth * 0.8);
  }

  render() {
    const { subGroup, i, k } = this.props;

    return (
      <>
        <div
          id={`chart-sub-groups-${k}-${i}`}
          style={{ minWidth: '250px', margin: '0 auto' }}
        ></div>
      </>
    );
  }
}

export default SubGroupChart;
