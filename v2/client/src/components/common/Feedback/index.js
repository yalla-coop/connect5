import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import Spin from '../Spin';

import {
  Wrapper,
  ChartWrapper,
  Description,
  Container,
  HeadlineDiv,
} from './Feedback.style';

import { fetchOverallTrainerFeedback as fetchOverallTrainerFeedbackAction } from '../../../actions/users';

class TrainerFeedbackOverall extends Component {
  componentDidMount() {
    const { fetchOverallTrainerFeedback } = this.props;
    const id = window.location.href.split('/')[5];

    fetchOverallTrainerFeedback(id);
  }

  sum = arr => arr.reduce((a, b) => a + b);

  render() {
    const { feedbackData, loaded } = this.props;
    const chartsData = [];
    const items = Object.keys(feedbackData);
    // loop over question groups
    items.map(text => {
      const group = feedbackData[text];
      // loop over answer groups
      group.counter.map(answer => {
        const values = [];
        const labels = [];
        // loop over single answer objects
        answer.surveyTypes.map(item => {
          // create values (no of answers per survey type) and labels (survey type) for chartJS
          const value = item[1];
          const surveyType = item[0];
          values.push(value);
          labels.push(surveyType);
          return null;
        });
        values.unshift(this.sum(values));
        labels.unshift('overall');
        // chart js data object
        const chartData = {
          question: group.questionText,
          answer: answer.answerText,
          labels,
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
              data: values,
            },
          ],
        };

        chartsData.push(chartData);
        return null;
      });
      return null;
    });

    return (
      <Wrapper>
        {loaded ? (
          <Container>
            {feedbackData.length === 0 ? (
              <Description>no data collected yet :( </Description>
            ) : (
              feedbackData.map(group => {
                return (
                  <div key={group.questionText}>
                    <HeadlineDiv>
                      <Description>{group.questionText}</Description>
                    </HeadlineDiv>
                    {chartsData.map((dataA, i) => {
                      return (
                        group.questionText === dataA.question && (
                          <ChartWrapper key={dataA[i]}>
                            <HorizontalBar
                              data={dataA}
                              width={6}
                              height={1}
                              options={{
                                responsive: true,
                                title: {
                                  display: true,
                                  text: `${dataA.answer}`,
                                  position: 'left',
                                },
                                legend: {
                                  display: true,
                                  labels: {
                                    generateLabels(chart) {
                                      const { labels } = dataA;
                                      const dataset = chart.data.datasets[0];
                                      const legend = labels.map((label, i) => {
                                        return {
                                          datasetIndex: 0,
                                          fillStyle:
                                            dataset.backgroundColor &&
                                            dataset.backgroundColor[i],
                                          strokeStyle:
                                            dataset.borderColor &&
                                            dataset.borderColor[i],
                                          lineWidth: dataset.borderWidth,
                                          text: label,
                                        };
                                      });
                                      return legend;
                                    },
                                  },
                                },
                                scales: {
                                  xAxes: [
                                    {
                                      barPercentage: 0,
                                      barThickness: 3,
                                      maxBarThickness: 4,
                                      minBarLength: 2,
                                      ticks: {
                                        beginAtZero: true,
                                      },
                                    },
                                  ],
                                  yAxes: [
                                    {
                                      barThickness: 5,
                                      gridLines: {
                                        offsetGridLines: true,
                                      },
                                      ticks: {
                                        beginAtZero: true,
                                        display: false,
                                      },
                                    },
                                  ],
                                },
                                offsetGridLines: true,
                              }}
                            />
                          </ChartWrapper>
                        )
                      );
                    })}
                  </div>
                );
              })
            )}
          </Container>
        ) : (
          <Spin />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  feedbackData: state.trainerFeedback.data,
  loaded: state.trainerFeedback.loaded,
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(
  mapStateToProps,
  { fetchOverallTrainerFeedback: fetchOverallTrainerFeedbackAction }
)(TrainerFeedbackOverall);
