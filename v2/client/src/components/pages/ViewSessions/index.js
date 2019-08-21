/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import SessionList from '../../common/List/SessionList';
import Header from '../../common/Header';

// ACTIONS
import {
  fetchTrainerSessions,
  fetchLocalLeadSessions,
  fetchALLSessions,
} from '../../../actions/groupSessionsAction';

// STYLING
import {
  ViewSessionsWrapper,
  TotalSessions,
  Span,
  SessionsCount,
  LinkBtn,
} from './ViewSessions.Style';

class ViewSessions extends Component {
  state = {
    headerTitle: null,
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
    const { userId, match, role } = this.props;
    const { localLeadId, trainerId } = match.params;
    let resultsFor;
    let resultForRule;
    let headerTitle;
    // admin || local lead || trainer viewing his own session
    if (match && match.path === '/my-sessions') {
      resultsFor = userId;
      resultForRule = 'trainer';
      headerTitle = 'Your Sessions';
      this.fetchSessionsData(resultForRule, resultsFor);
    } else if (
      (match &&
        match.path === '/group-results/:trainerId?' &&
        role === 'admin') ||
      role === 'localLead'
    ) {
      if (localLeadId) {
        resultsFor = localLeadId;
        resultForRule = 'localLead';
        headerTitle = 'Group Sessions';
        this.fetchSessionsData(resultForRule, resultsFor);
      } else {
        resultsFor = userId;
        resultForRule = 'localLead';
        headerTitle = 'Yours Group Sessions';
        this.fetchSessionsData(resultForRule, resultsFor);
      }
    } else if (match && match.path === '/all-sessions') {
      resultsFor = userId;
      resultForRule = 'admin';
      headerTitle = 'All Sessions';

      this.fetchSessionsData(resultForRule, resultsFor);
    } else if (match && match.path === '/trainer-sessions/trainerId?') {
      if (trainerId) {
        resultsFor = trainerId;
        resultForRule = 'trainer';
        headerTitle = 'Trainer Sessions';

        this.fetchSessionsData(resultForRule, resultsFor);
      }
    }
    this.setState({ headerTitle });
  };

  fetchSessionsData = (role, id) => {
    if (role === 'admin') {
      this.props.fetchALLSessions();
    } else if (role === 'trainer') {
      this.props.fetchTrainerSessions(id);
    } else if (role === 'localLead') {
      this.props.fetchLocalLeadSessions(id);
    }
  };

  render() {
    const { headerTitle } = this.state;

    const { sessions } = this.props;
    if (!sessions) {
      return <div>loading</div>;
    }
    return (
      <ViewSessionsWrapper>
        <Header label={headerTitle} type="section" />
        <TotalSessions>
          <Span>Total Sessions</Span>
          <SessionsCount>{sessions && sessions.length}</SessionsCount>
          <LinkBtn to="/create-session">Add New Session</LinkBtn>
        </TotalSessions>
        <SessionList dataList={sessions} />
      </ViewSessionsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.id,
    role: state.auth.role,
    sessions: state.sessions.sessions,
  };
};

export default connect(
  mapStateToProps,
  { fetchTrainerSessions, fetchLocalLeadSessions, fetchALLSessions }
)(ViewSessions);
