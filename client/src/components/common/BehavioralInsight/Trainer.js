/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import React, { Component } from 'react';
import { Chart, HorizontalBar } from 'react-chartjs-2';
import { Spin, Empty } from 'antd';
import { connect } from 'react-redux';

import { fetchTrainerBehavioral as fetchbehavioralInsightAction } from '../../../actions/behavioralInsight';
import Explanation from './Explanation';

import {
  Wrapper,
  ChartWrapper,
  Description,
  ContentWrapper,
  WhiteWrapper,
} from './BehavioralInsight.style';

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
    for (let i = 0; i < dataset.data.length; i += 1) {
      if (
        (dataset && !dataset.hidden === true) ||
        dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false
      ) {
        const model =
          dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
        if (dataset.data[i] !== null) {
          ctx.fillText(dataset.data[i], model.x - 10, model.y + 20);
        }
      }
    }
  });
}

class BehavioralTrainerResults extends Component {
  componentDidMount() {
    const { trainerId, fetchbehavioralInsight, role } = this.props;
    if (role === 'admin') {
      fetchbehavioralInsight('/api/behavioral-insight/admin');
    } else if (role === 'localLead') {
      fetchbehavioralInsight(`/api/behavioral-insight/local-lead/${trainerId}`);
    } else {
      fetchbehavioralInsight(`/api/behavioral-insight/trainer/${trainerId}`);
    }
  }

  render() {
    const { data, loaded } = this.props;

    return (
      <Wrapper>
        <Explanation />
        <ContentWrapper>
          {loaded ? (
            <>
              {Object.keys(data).length ? (
                Object.entries(data).map(pairOfArray => (
                  <ChartWrapper key={pairOfArray[0]}>
                    <WhiteWrapper>
                      <Description>{pairOfArray[0]}</Description>
                      <HorizontalBar
                        width={25}
                        height={15}
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
                          labels: Object.keys(pairOfArray[1]),
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
                              data: Object.values(pairOfArray[1]),
                            },
                          ],
                        }}
                        options={{
                          responsive: 1,
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
                    </WhiteWrapper>
                  </ChartWrapper>
                ))
              ) : (
                <div style={{ margin: '10px auto', maxWidth: '270px' }}>
                  <Empty
                    description="No data collected yet"
                    style={{ paddingBottom: '7rem' }}
                  />
                </div>
              )}
            </>
          ) : (
            <Spin style={{ width: '100%', padding: '40px' }} />
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.behavioralInsight.trainer.data,
  loaded: state.behavioralInsight.trainer.loaded,
});

export default connect(
  mapStateToProps,
  { fetchbehavioralInsight: fetchbehavioralInsightAction }
)(BehavioralTrainerResults);
