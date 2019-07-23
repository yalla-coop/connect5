/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import Header from '../../common/Header';
import SessionList from './SessionsList';

// ACTIONS
import { fetchParticipentSessions } from '../../../actions/groupSessionsAction';

// STYLING
import { Wrapper, Span } from './ParticipantProgress.style';

class ParticipantProgress extends Component {
  componentDidMount() {
    const { PIN } = this.props;
    this.props.fetchParticipentSessions(PIN);
  }

  render() {
    const { sessions } = this.props;
    if (!sessions) {
      return <div>loading</div>;
    }
    return (
      <Wrapper>
        <Header label="My progress" type="section" />
        <Span>Completed Sessions</Span>
        <SessionList dataList={sessions.filter(item => item.completed)} />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loaded: state.auth.loaded,
    PIN: state.auth.PIN,
    role: state.auth.role,
    sessions: state.sessions.sessions,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipentSessions }
)(ParticipantProgress);
