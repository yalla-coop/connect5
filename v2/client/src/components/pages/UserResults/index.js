/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

//  ANTD COMPONENTS
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';

//  COMMON COMPOENTS
import Reach from '../../common/Reach';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import SessionList from '../../common/List/SessionList';
import Feedback from '../../common/Feedback';
// ACTIONS
import { fetchUserResults as fetchUserResultsAction } from '../../../actions/users';

import {
  fetchTrainerSessions,
  fetchLocalLeadSessions,
  fetchALLSessions,
} from '../../../actions/groupSessionsAction';

// STYLING
import {
  TrainerResultsWrapper,
  ContentWrapper,
  TopSection,
  Registration,
} from './UserResults.style';

import TrainerBehavioralInsight from '../../common/BehavioralInsight/Trainer';
import ExportButton from '../../common/ExportButton';
import {
  TRAINER_RESULTS_URL,
  ALL_RESULTS_URL,
  GROUP_RESULTS_URL,
  MY_RESULTS_URL,
} from '../../../constants/navigationRoutes';

const { Panel } = Collapse;

const showModal = () => {
  Modal.info({
    content:
      'We all know that changing what we do is not as simple as knowing what to do. Just because we CAN do something doesn’t mean that we WILL do it. We will be asking you some questions about what you do in practice, about what you expect you will do when you return to work and about some of the thoughts and feelings you have that make up your capability, opportunity and motivation. This will help you and us understand about experiences of doing the behaviours promoted in Connect 5 as you go about your work.',
    style: { top: 20 },
    icon: false,
  });
};
const panels = {
  reach: { text: 'Reach', render: props => <Reach data={props.results} /> },
  feedback: {
    text: 'Trainer feedback',
    render: ({ resultsFor, resultForRule }) => (
      <Feedback trainerId={resultsFor} role={resultForRule} />
    ),
  },
  behavior: {
    text: (
      <span>
        Behavioural
        <Icon
          onClick={e => {
            e.stopPropagation();
            showModal();
          }}
          type="info-circle"
          style={{ marginLeft: '1rem', color: '#1890ff' }}
        />
      </span>
    ),
    render: ({ resultsFor, resultForRule, ...props }) => {
      return (
        <TrainerBehavioralInsight
          {...props}
          trainerId={resultsFor}
          role={resultForRule}
        />
      );
    },
  },
};

class UserResults extends Component {
  state = {
    resultsFor: null,
    resultForRule: null,
    toggle: 'left',
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { path: oldPath } = prevProps.match;
    const { path } = this.props.match;
    if (path !== oldPath) {
      this.getData();
    }
  }

  getData = () => {
    const { userId, history, match, role } = this.props;
    const { localLeadId, trainerId } = match.params;
    const { state } = history.location;

    // if a user has been passed on then store as the user
    const user = state && state.trainer;
    const viewdUserName =
      user && user.name && user.name[0].toUpperCase() + user.name.slice(1);

    let resultsFor;
    let resultForRule;
    let headerTitle;
    if (match && match.path === MY_RESULTS_URL) {
      // admin || local-lead || trainer viewing his own results as a trainer
      resultsFor = userId;
      resultForRule = 'trainer';
      headerTitle = 'Your ';

      this.props.fetchTrainerSessions(resultsFor);
      this.props.fetchUserResults(resultsFor, resultForRule);
    } else if (
      match &&
      match.path === GROUP_RESULTS_URL &&
      (role === 'admin' || role === 'localLead')
    ) {
      if (localLeadId && role === 'admin') {
        // admin is viewing local-lead's group results
        resultsFor = localLeadId;
        resultForRule = 'localLead';
        headerTitle = `${viewdUserName} - Group `;

        this.props.fetchLocalLeadSessions(resultsFor);
        this.props.fetchUserResults(resultsFor, resultForRule);
      } else {
        // local-lead is viewing his group results
        resultsFor = userId;
        resultForRule = 'localLead';
        headerTitle = "Your Group's ";

        this.props.fetchLocalLeadSessions(resultsFor);
        this.props.fetchUserResults(resultsFor, resultForRule);
      }
    } else if (
      match &&
      match.path === TRAINER_RESULTS_URL &&
      (role === 'admin' || role === 'localLead')
    ) {
      // admin || local-lead viewing trainer || local-lead as a trainer result
      if (trainerId) {
        resultsFor = trainerId;
        resultForRule = 'trainer';
        headerTitle = `${viewdUserName} - `;

        this.props.fetchTrainerSessions(resultsFor);
        this.props.fetchUserResults(resultsFor, resultForRule);
      }
    } else if (match && match.path === ALL_RESULTS_URL && role === 'admin') {
      // admin viewing all sessions results
      resultsFor = userId;
      resultForRule = 'admin';
      headerTitle = 'All - ';

      this.props.fetchALLSessions();
      this.props.fetchUserResults(resultsFor, resultForRule);
    } else {
      history.push('/unauthorized');
    }
    this.setState({ resultsFor, resultForRule, headerTitle });
  };

  clickToggle = () => {
    const { toggle } = this.state;
    if (toggle === 'left') this.setState({ toggle: 'right' });
    else this.setState({ toggle: 'left' });
  };

  render() {
    const { results, role, history, sessions, userId } = this.props;
    const { state } = history.location;
    const { toggle, resultsFor, resultForRule, headerTitle } = this.state;
    // if a user has been passed on then store as the user
    const user = state && state.trainer;

    return (
      <TrainerResultsWrapper>
        <Header
          label={
            toggle === 'left'
              ? `${headerTitle} Results`
              : `${headerTitle} Sessions`
          }
          type="section"
        />
        {userId !== resultsFor && (
          <TopSection>
            <Registration>
              Data collected since registering on {results.registrationDate}
            </Registration>
            <Toggle
              leftText="results"
              rightText="sessions"
              selected={toggle}
              onClick={this.clickToggle}
            />
          </TopSection>
        )}
        {toggle === 'left' && (
          <ContentWrapper>
            <Collapse
              accordion
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <Icon type="down" rotate={isActive ? 90 : 0} />
              )}
            >
              {Object.keys(panels).map(panel => (
                <Panel header={panels[panel].text} key={panel}>
                  {panels[panel].render({
                    results,
                    resultsFor,
                    resultForRule,
                    role,
                  })}
                </Panel>
              ))}
            </Collapse>
          </ContentWrapper>
        )}
        {toggle === 'right' && (
          <ContentWrapper>
            <SessionList dataList={sessions} />
          </ContentWrapper>
        )}
        {/* <ButtonWrapper>
          <Button icon="download" size="large">
            Export to CSV
          </Button>
        </ButtonWrapper> */}
        <ExportButton filter selectedUser={user} />
      </TrainerResultsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results,
  userId: state.auth.id,
  sessions: state.sessions.sessions,
  sessionsNum: state.sessions.sessionsCount,
});

export default connect(
  mapStateToProps,
  {
    fetchUserResults: fetchUserResultsAction,
    fetchTrainerSessions,
    fetchLocalLeadSessions,
    fetchALLSessions,
  }
)(UserResults);
