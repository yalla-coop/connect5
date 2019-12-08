/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Empty } from 'antd';

// // COMMON COMPONENTS
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import BehavioralInsight from '../../common/BehavioralInsight';
import Feedback from '../../common/Feedback';

// ACTIONS
import { fetchParticipantSessions } from '../../../actions/groupSessionsAction';

// CONSTANTS
import {
  readableSurveysNamePairs,
  surveysHaveTrainerFeedbackQuestions,
} from '../../../constants';

// STYLING
import { PageWrapper, ContentWrapper, Session } from './ViewParticipant.style';

class ViewParticipant extends Component {
  state = {
    toggle: 'left',
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchParticipantSessions({ PIN: match.params.PIN });
  }

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const { toggle } = this.state;
    const { match, sessions } = this.props;
    const surveyList = sessions.reduce((prev, cur) => {
      prev.push(...cur.surveyType);
      return prev;
    }, []);

    const surveysIncludeFeedbak = surveyList.some(item =>
      surveysHaveTrainerFeedbackQuestions.includes(item)
    );

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
              <BehavioralInsight
                backgroundColor="#fff"
                userRole="participant"
                idOrPIN={match.params.PIN}
                defaultFilters={{
                  PIN: match.params.PIN,
                }}
                surveyList={sessions.reduce((prev, cur) => {
                  if (cur.surveyType) prev.push(...cur.surveyType);
                  return prev;
                }, [])}
              />
            </ContentWrapper>
          ) : (
            <ContentWrapper>
              {sessions.map(session => (
                <Session key={session._id.type}>
                  {session.surveyType
                    .map(surveyType => readableSurveysNamePairs[surveyType])
                    .join(' / ')}
                  :
                  <span
                    className="trainer"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {session.trainers.map(i => i.name).join(' & ')}
                  </span>
                </Session>
              ))}
              {surveysIncludeFeedbak ? (
                <Feedback
                  defaultFilters={{
                    PIN: match.params.PIN,
                  }}
                  surveyList={surveyList}
                />
              ) : (
                <Empty
                  description="Surveys aren't include trainer feedback question"
                  style={{ marginTop: '5rem' }}
                />
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
    isAuthenticated: state.auth.isAuthenticated,
    loaded: state.auth.loaded,
    PIN: state.auth.PIN,
    role: state.auth.role,
    sessions: state.sessions.participantSessions,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipantSessions }
)(ViewParticipant);
