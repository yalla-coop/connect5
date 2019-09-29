import React, { Component } from 'react';
import * as d3 from 'd3';

class Chart1 extends Component {
  svgWidth = 150;

  svgHeight = 400;

  bottomLine = 300;

  bottomLineWidth = 2;

  colors = ['#333333', '#4F4F4F', '#828282'];

  explanation = ['Capability', 'Opportunity', 'Motivation'];

  state = {
    data: [{ key: 0, num: 20 }, { key: 1, num: 21 }, { key: 2, num: 40 }],
  };

  componentDidMount() {
    d3.select('svg')
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight);

    this.drawChart();
  }

  drawChart = () => {
    const { data } = this.state;
    const xScale = this.calculateXScale();
    const yScale = this.calculateYScale();
    const svg = d3.select('svg');
    const bars = svg.selectAll('rect').data(data, d => d.key);

    const enteringBars = bars
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(i))
      .attr('y', this.svgHeight)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (d, i) => this.colors[i]);

    const mergedBarSelection = enteringBars.merge(bars);

    mergedBarSelection
      .transition()
      .duration(750)
      .attr('x', (_, i) => xScale(i))
      .attr('y', d => this.svgHeight - yScale(d.num))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d.num));

    bars
      .exit()
      .transition()
      .attr('x', -xScale.bandwidth())
      .remove();

    const labels = svg.selectAll('text').data(data, d => d.key);

    const enteringLabels = labels
      .enter()
      .append('text')
      .text(d => d.num)
      .attr('x', (_, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', this.svgHeight)
      .attr('font-size', '14px')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle');

    const mergedLabelSelection = enteringLabels.merge(labels);

    mergedLabelSelection
      .transition()
      .duration(1000)
      .attr('x', (_, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => this.svgHeight - yScale(d.num) - 15);

    labels
      .exit()
      .transition()
      .attr('x', -xScale.bandwidth())
      .remove();

    const lines = svg.selectAll('line').data(data, d => d.key);

    const enteringLines = lines
      .enter()
      .append('line')
      .attr('x1', 0) /* stating point on x axis */
      .attr('x2', this.svgWidth) /* end point on x axis */
      .attr('y1', this.bottomLine) /* stating point on y axis */
      .attr('y2', this.bottomLine) /* end point on x axis */
      .attr('stroke', 'red') /* fill color */
      .attr('stroke-width', this.bottomLineWidth);

    const mergedLinesSelection = enteringLines.merge(lines);

    mergedLinesSelection
      .transition()
      .duration(1000)
      .attr('x', (_, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => this.svgHeight - yScale(d.num) + 15);

    lines
      .exit()
      .transition()
      .attr('x', -xScale.bandwidth())
      .remove();
  };

  calculateXScale = () => {
    const { data } = this.state;
    return d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, this.svgWidth]);
  };

  calculateYScale = () => {
    const { data } = this.state;
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.num)])
      .range([0, this.svgHeight - 100]);
  };

  addBar = () => {
    const { data } = this.state;
    const newNum = Math.floor(Math.random() * d3.max(data, d => d.num)) + 1;
    const newData = [
      ...data,
      { key: data[data.length - 1].key + 1, num: newNum },
    ];
    this.setState({ data: newData }, () => this.draw());
  };

  removeBar = () => {
    const { data } = this.state;
    const newData = [...data].slice(1);
    this.setState({ data: newData }, () => this.draw());
  };

  render() {
    return (
      <section
        className="page-excl-nav"
        style={{ width: '50%', margin: '0 auto' }}
      >
        <div id="chart" />
        <svg></svg>
        <h4 className="graph-title">Pre Survey</h4>
      </section>
    );
  }
}

export default Chart1;
