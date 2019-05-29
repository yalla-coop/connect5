/* eslint-disable func-names */
import React, { Component } from 'react';
import { Chart, HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';

function drawBarValues() {
  // render the value of the chart above the bar
  const { ctx } = this.chart;
  ctx.font = Chart.helpers.fontString(
    Chart.defaults.global.defaultFontSize,
    'normal',
    Chart.defaults.global.defaultFontFamily
  );
  ctx.fillStyle = this.chart.config.options.defaultFontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'center';
  this.data.datasets.forEach(function(dataset) {
    for (let i = 0; i < dataset.data.length; i++) {
      if (
        dataset.hidden === true &&
        dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false
      ) {
        continue;
      }
      const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      if (dataset.data[i] !== null) {
        ctx.fillText(dataset.data[i], model.x - 10, model.y + 20);
      }
    }
  });
}
export default class Test extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    axios
      .get('/api/behavioral-insight/session/5cebd1450528457e77432417')
      .then(res => {
        console.log(res.data.calculatedFormulae);
        this.setState({ data: res.data.calculatedFormulae });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Hello</h1>
        {Object.entries(data).map(pairOfArray => (
          <>
            <h6>{pairOfArray[0]}</h6>
            <h6>{pairOfArray[1]}</h6>
            <HorizontalBar
              data={{
                layout: {
                  padding: {
                    top: 5,
                    left: 15,
                    right: 15,
                    bottom: 15,
                  },
                },
                responsive: true,
                labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
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
                    data: pairOfArray[1],
                  },
                ],
              }}
              options={{
                animation: {
                  onProgress: drawBarValues,
                  onComplete: drawBarValues,
                },
                hover: { animationDuration: 0 },

                showAllTooltips: true,
                legend: {
                  display: false,
                },

                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        offsetGridLines: true,
                        display: false,
                      },

                      ticks: {
                        beginAtZero: true,
                        steps: 2,
                        stepValue: 5,
                        max: 100,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      barPercentage: 1,
                      barThickness: 20,
                      gridLines: {
                        offsetGridLines: true,
                        display: false,
                      },
                      ticks: {
                        beginAtZero: true,
                        steps: 2,
                        stepValue: 5,
                        max: 100,
                      },
                    },
                  ],
                },
                offsetGridLines: true,
              }}
            />
          </>
        ))}
      </div>
    );
  }
}
