/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

//  ANTD COMPONENTS
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';

//  COMMON COMPOENTS
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import SessionList from '../../common/List/SessionList';
import ExportButton from '../../common/ExportButton';

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

import {
  TRAINER_RESULTS_URL,
  ALL_RESULTS_URL,
  GROUP_RESULTS_URL,
  MY_RESULTS_URL,
} from '../../../constants/navigationRoutes';

import panels from './panels';

const { Panel } = Collapse;

class UserResults extends Component {
  state = {
    resultsFor: null,
    resultForRule: null,
    toggle: 'left',
    showFilter: false,
    filters: {},
    hiddenFields: [],
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

  isFilterActive = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

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
    let filters = {};
    let hiddenFields = [];
    if (match && match.path === MY_RESULTS_URL) {
      // admin || local-lead || trainer viewing their own results as a trainer
      resultsFor = userId;
      resultForRule = 'trainer';
      headerTitle = 'Your ';
      filters = { trainer: [resultsFor] };
      hiddenFields = ['localLead', 'trainer'];

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
        filters = { localLead: [localLeadId] };
        hiddenFields = ['localLead'];

        this.props.fetchLocalLeadSessions(resultsFor);
        this.props.fetchUserResults(resultsFor, resultForRule);
      } else {
        // local-leads is viewing their group results
        resultsFor = userId;
        resultForRule = 'localLead';
        headerTitle = "Your Group's ";
        filters = { localLead: [userId] };
        hiddenFields = ['localLead'];

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
        hiddenFields = ['trainer', 'localLead'];

        this.props.fetchTrainerSessions(resultsFor);
        this.props.fetchUserResults(resultsFor, resultForRule);
      }
    } else if (match && match.path === ALL_RESULTS_URL && role === 'admin') {
      // admin viewing all sessions results
      resultsFor = userId;
      resultForRule = 'admin';
      headerTitle = 'All - ';
      // no filters & no hidden fields

      this.props.fetchALLSessions();
      this.props.fetchUserResults(resultsFor, resultForRule);
    } else {
      history.push('/unauthorized');
    }
    this.setState({
      resultsFor,
      resultForRule,
      headerTitle,
      filters,
      hiddenFields,
    });
  };

  clickToggle = () => {
    const { toggle } = this.state;
    if (toggle === 'left') this.setState({ toggle: 'right' });
    else this.setState({ toggle: 'left' });
  };

  render() {
    const { results, role, sessions, userId } = this.props;
    const {
      toggle,
      resultsFor,
      resultForRule,
      headerTitle,
      filters,
      hiddenFields,
    } = this.state;
    // if a user has been passed on then store as the user

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
                    hiddenFields,
                    filters,
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

        <ExportButton filters={filters} />
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
