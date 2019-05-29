import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import Spin from '../../common/Spin';

import {
  Wrapper,
  Paragraph,
  ChartWrapper,
} from './TrainerFeedbackOverall.style';
import Header from '../../common/Header';

import { fetchOverallTrainerFeedback as fetchOverallTrainerFeedbackAction } from '../../../actions/users';

class TrainerFeedbackOverall extends Component {
  componentDidMount() {
    const {
      history,
      isAuthenticated,
      fetchOverallTrainerFeedback,
      match: { params },
    } = this.props;

    const { id } = params;

    return !isAuthenticated
      ? history.push('/')
      : fetchOverallTrainerFeedback(id);
  }

  render() {
    const { feedbackData, loaded } = this.props;
    const chartsData = [];
    const items = Object.keys(feedbackData);

    items.map(text => {
      const el = feedbackData[text];

      el.counter.map(answer => {
        const values1 = [];
        const surveys1 = [];
        answer.surveyTypes.map(item => {
          const value = item[1];
          const sType = item[0];
          values1.push(value);
          surveys1.push(sType);
        });

        const chartData = {
          question: el.questionText,
          answer: answer.answerText,
          labels: surveys1,
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
              data: values1,
            },
          ],
        };
        chartsData.push(chartData);
      });
    });

    return (
      <Wrapper>
        <Header type="view" label="Trainer Feedback" />
        <Paragraph>Did your trainer ask questions...</Paragraph>
        {/*  */}
        {loaded ? (
          <div>
            {feedbackData.map(group => {
              return (
                <div>
                  <div>
                    <h4>{group.questionText}</h4>
                  </div>
                  {chartsData.map((dataA, i) => {
                    return (
                      group.questionText === dataA.question && (
                        <div>
                          <ChartWrapper>
                            <p>{dataA.answer}</p>
                            <HorizontalBar
                              data={dataA}
                              width={5}
                              height={1}
                              options={{
                                legend: {
                                  display: false,
                                },

                                scales: {
                                  xAxes: [
                                    {
                                      barPercentage: 0.5,
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
                                      barThickness: 10,
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
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
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
