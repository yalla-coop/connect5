import React, { Component } from 'react';
import Chart1 from './chart1';
import { ChartWrapper } from './BarChart.style';

class BarChart extends Component {
  componentDidMount() {}

  render() {
    return (
      <ChartWrapper>
        <Chart1 />
      </ChartWrapper>
    );
  }
}

export default BarChart;
