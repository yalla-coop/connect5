import React, { Component } from 'react';
import * as d3 from 'd3';
import { colors } from './constants';
import { wrapText } from './helpers';

class SubGroupChart extends Component {
  componentDidMount() {
    const { title, i, legends, dataset, replies } = this.props;
    const barWidth = 30;
    const chartWidth = dataset.length * barWidth;
    const margin = { top: 40, right: 10, bottom: 0, left: 10 };
    const chartHeight = 250;

    const bandScale = d3
      .scaleBand()
      .domain(legends)
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
      .select(`#chart-sub-groups-${i}`)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('style', 'display: block; margin: 25px auto 0');

    // bars groups
    const groups = svg
      .selectAll(`.chart-sub-groups-${i}-g`)
      .data(dataset)
      .enter()
      .append('g')
      .attr('class', `chart-sub-groups-${i}-g`);

    // empty bars
    groups
      .append('rect')
      .attr('width', bandScale.bandwidth())
      .attr('x', d => bandScale(d.category || d.surveyType))
      .attr('height', chartHeight - margin.top - margin.bottom)
      .attr('y', margin.top)
      .attr('fill', 'none')
      .attr('stroke', '#F2F2F2')
      .attr('stroke-width', 2);

    // filled bars
    groups
      .append('rect')
      .attr('width', bandScale.bandwidth())
      .attr('x', d => bandScale(d.category || d.surveyType))
      .attr('height', d => yScale(d.value > 100 ? 100 : d.value))
      .attr('y', d => {
        return chartHeight - yScale(d.value > 100 ? 100 : d.value);
      })
      .attr('fill', d => ordinalScale(d.category || d.surveyType));

    // red lines
    groups
      .append('line')
      .attr('stroke', d => (d.responsesCount ? `#fc6b6b` : 'none'))
      .attr('stroke-width', 2)
      .attr('x1', d => bandScale(d.category || d.surveyType))
      .attr('y1', d => chartHeight - yScale(d.average))
      .attr(
        'x2',
        d => bandScale(d.category || d.surveyType) + bandScale.bandwidth()
      )
      .attr('y2', d => chartHeight - yScale(d.average));

    // no data text
    groups
      .append('text')
      .text('No data yet')
      .attr('fill', '#828282')
      .attr('opacity', d => (d.responsesCount ? 0 : 0.7))
      .attr(
        'x',
        d => bandScale(d.category || d.surveyType) + bandScale.bandwidth() / 2
      )
      .attr('y', (chartHeight - margin.top - margin.bottom) / 2)
      .attr('writing-mode', 'tb')
      .attr('text-anchor', 'end')
      .attr(
        'transform',
        d =>
          `rotate(180 ${bandScale(d.category || d.surveyType) +
            bandScale.bandwidth() / 2}, ${(chartHeight -
            margin.top -
            margin.bottom) /
            2})`
      );

    // value texts
    svg
      .selectAll(`.chart-sub-groups-${i}-text`)
      .data(dataset)
      .enter()
      .append('text')
      .text(d => `${Math.round(d.value || 0)}%`)
      .attr('class', `chart-sub-groups-${i}-text`)
      .attr('text-anchor', 'middle')
      .attr('opacity', d => {
        if (d.responsesCount) return ((d.value || 0) * 0.8) / 100 + 0.2;
        return 0;
      })
      .attr(
        'x',
        d => bandScale(d.category || d.surveyType) + bandScale.bandwidth() / 2
      )
      .attr('y', margin.top / 2)
      .attr('writing-mode', 'tb')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        d =>
          `rotate(180 ${bandScale(d.category || d.surveyType) +
            bandScale.bandwidth() / 2}, ${margin.top / 2 - 2})`
      );

    const svg2 = d3
      .select(`#chart-sub-groups-${i}`)
      .append('svg')
      .attr('width', 150)
      .attr('height', 75)
      .attr('style', 'display: block; margin: 0 auto');

    svg2
      .selectAll(`.chart-sub-groups-${i}-title`)
      .data([`${title}`])
      .enter()
      .append('text')
      .text(d => (replies ? `${d} (${replies}+replies)` : d))
      .attr('text-anchor', 'middle')
      .attr('alignment-base', 'bottom')
      .attr('x', 150 / 2)
      .attr('y', 25)
      .attr('width', 150)
      .attr('height', 75)
      .call(wrapText, Math.max(chartWidth, 150));
  }

  render() {
    const { i } = this.props;

    return (
      <>
        <div
          id={`chart-sub-groups-${i}`}
          style={{ minWidth: '100px', margin: '0 auto' }}
        ></div>
      </>
    );
  }
}

export default SubGroupChart;
