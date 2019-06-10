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
  componentDidMount() {
    this.props.fetchALLSessions();
    const { role, id } = this.props;
    this.fetchSessionsData(role, id);
  }

  componentDidUpdate(prevProps) {
    const { role, id } = this.props;
    if (id !== prevProps.id || role !== prevProps.role) {
      this.fetchSessionsData(role, id);
    }
  }

  fetchSessionsData = (role, id) => {
    this.props.fetchALLSessions();
    if (role === 'trainer') {
      this.props.fetchTrainerSessions(id);
    } else {
      this.props.fetchLocalLeadSessions(id);
    }
  };

  render() {
    const { sessions, sessionsNum } = this.props;
    if (!sessions || !sessionsNum) {
      return <div>loading</div>;
    }
    return (
      <ViewSessionsWrapper>
        <Header label="sessions" type="section" />
        <TotalSessions>
          <Span>Total Sessions</Span>
          <SessionsCount>{sessionsNum}</SessionsCount>
          <LinkBtn to="/create-session">Add New Session</LinkBtn>
        </TotalSessions>
        <SessionList dataList={sessions} />
      </ViewSessionsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.id,
    role: state.auth.role,
    sessions: state.sessions.sessions,
    sessionsNum: state.sessions.sessionsCount,
  };
};

export default connect(
  mapStateToProps,
  { fetchTrainerSessions, fetchLocalLeadSessions, fetchALLSessions }
)(ViewSessions);
