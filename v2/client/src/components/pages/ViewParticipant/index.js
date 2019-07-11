/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

// // COMMON COMPONENTS
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import ParticipantBehavioralInsight from '../../common/BehavioralInsight/Participant';

// ACTIONS
import { fetchParticipantFeedBack } from '../../../actions/trainerAction';

// STYLING
import {
  PageWrapper,
  ContentWrapper,
  IndividualQuestion,
  SessionSpan,
  Answer,
  Session,
  AnswersWrapper,
} from './ViewParticipant.style';

class ViewParticipant extends Component {
  state = {
    toggle: 'left',
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchParticipantFeedBack(match.params.PIN);
  }

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const { toggle } = this.state;
    const { match, data } = this.props;
    const { feedback, sessions } = data;
    return (
      <PageWrapper>
        <Header label={`Viewing ${match.params.PIN}`} type="view" />
        <Toggle
          selected={toggle}
          leftText="Behavioural Insights"
          rightText="Trainer Feedback"
          large
          style={{ margin: '20px auto' }}
          onClick={this.clickToggle}
        />
        <>
          {toggle === 'left' ? (
            <ContentWrapper>
              <p>
                Behaviour is influenced by our perceptions of our capability,
                opportunity and motivation for that behaviour
              </p>
              <ParticipantBehavioralInsight
                backgroundColor="#fff"
                userRole="participant"
                idOrPIN={match.params.PIN}
              />
            </ContentWrapper>
          ) : (
            <ContentWrapper>
              {sessions.map(session => (
                <Session key={session._id.type}>
                  {session.surveyType}:{' '}
                  {session.trainers.map((trainer, index) => (
                    <span className="trainer" key={trainer._id}>
                      {index > 0 && ' & '}
                      {trainer.name}
                    </span>
                  ))}
                </Session>
              ))}
              {feedback.length ? (
                <div style={{ backgroundColor: '#fff', marginTop: '1rem' }}>
                  {feedback.map(question => (
                    <IndividualQuestion key={question._id.code}>
                      <SessionSpan>Q.</SessionSpan>
                      {question._id.text}
                      <AnswersWrapper style={{ paddingLeft: '11px' }}>
                        {question.answers.map((answer, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Answer key={answer.id + index}>
                            <SessionSpan>{answer.surveyType}: </SessionSpan>
                            {answer.answer}
                          </Answer>
                        ))}
                      </AnswersWrapper>
                    </IndividualQuestion>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: '1rem' }}>
                  <Alert
                    message="No behavioural insight data collected yet!"
                    type="warning"
                    showIcon
                  />
                </div>
              )}
            </ContentWrapper>
          )}
        </>
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.trainerFeedback.participant.data,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipantFeedBack }
)(ViewParticipant);
