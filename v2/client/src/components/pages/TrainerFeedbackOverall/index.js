import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import Spin from '../../common/Spin';

import {
  Wrapper,
  Paragraph,
  ChartWrapper,
  Description,
  Container,
  HeadlineDiv,
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

  sum = arr => arr.reduce((a, b) => a + b);

  render() {
    const { feedbackData, loaded } = this.props;
    const chartsData = [];
    const items = Object.keys(feedbackData);

    items.map(text => {
      const group = feedbackData[text];

      group.counter.map((answer, i) => {
        const values = [];
        const labels = [];
        answer.surveyTypes.map(item => {
          const value = item[1];
          const surveyType = item[0];
          values.push(value);
          labels.push(surveyType);
          return null;
        });
        values.unshift(this.sum(values));
        labels.unshift('overall');

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
                // '#e8c3b9',
                // '#c45850',
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
        <Header type="view" label="Trainer Feedback" />
        {/*  */}
        {loaded ? (
          <Container>
            <Paragraph>Did your trainer ask questions...</Paragraph>
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
