/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';

import { Wrapper, ChartWrapper, Description } from './BehavioralInsight.style';

export default class BehavioralInsight extends Component {
  state = { data: {} };

  componentDidMount() {
    axios.get('/api/behavioral-insight/participant/HIO13').then(({ data }) => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    const texts = Object.keys(data);
    const chartsData = [];
    texts.forEach(text => {
      const chartData = {
        labels: data[text].labels,
        type: 'horizontalBar',
        datasets: [
          {
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
            ],
            data: data[text].values,
          },
        ],
      };

      chartsData.push(chartData);
    });

    return (
      <Wrapper>
        {chartsData.map((dataA, index) => (
          <>
            <ChartWrapper>
              <Description>{texts[index]}</Description>
              <HorizontalBar
                data={dataA}
                width={30}
                height={10}
                options={{
                  legend: {
                    display: false,
                  },

                  scales: {
                    xAxes: [
                      {
                        barPercentage: 0.5,
                        barThickness: 6,
                        maxBarThickness: 8,
                        minBarLength: 2,
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        barThickness: 20,
                        gridLines: {
                          offsetGridLines: true,
                        },
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  offsetGridLines: true,
                }}
              />
            </ChartWrapper>
          </>
        ))}
      </Wrapper>
    );
  }
}
