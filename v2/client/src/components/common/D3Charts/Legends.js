import React, { Component } from 'react';
import * as d3 from 'd3';

import { colors } from './constants';
import { getDivWidth } from './helpers';

class Legends extends Component {
  componentDidMount() {
    const { legends, i } = this.props;

    const parentWidth = getDivWidth(`#chart-legends-${i}`);
    const chartWidth = parentWidth > 400 ? parentWidth * 0.8 : 300;
    const chartHeight = 50;
    const fontSize = parentWidth > 400 ? 16 : 14;

    const boxSize = 15;

    // for width of each legend
    const bandScale = d3
      .scaleBand()
      .domain(legends)
      .range([0, chartWidth]);

    // for boxes colors
    const ordinalScale = d3
      .scaleOrdinal()
      .domain(legends)
      .range(colors.slice(0, legends.length));

    const svg = d3
      .select(`#chart-legends-${i}`)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight);

    svg
      .selectAll('rect')
      .data(legends)
      .enter()
      .append('rect')
      .attr('width', boxSize)
      .attr('height', boxSize)
      .attr('x', d => bandScale(d))
      .attr('fill', d => ordinalScale(d));

    svg
      .selectAll('text')
      .data(legends)
      .enter()
      .append('text')
      .attr('font-size', fontSize)
      .text(d => d)
      .attr('x', d => bandScale(d) + boxSize)
      .attr('y', boxSize);
  }

  render() {
    const { i } = this.props;
    return <div id={`chart-legends-${i}`}></div>;
  }
}

export default Legends;
