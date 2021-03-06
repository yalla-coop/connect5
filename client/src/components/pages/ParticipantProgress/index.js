/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import Header from '../../common/Header';
import SessionList from './SessionsList';

// ACTIONS
import { fetchParticipantSessions } from '../../../actions/groupSessionsAction';

// STYLING
import { Wrapper, Span } from './ParticipantProgress.style';

class ParticipantProgress extends Component {
  componentDidMount() {
    const { PIN } = this.props;
    this.props.fetchParticipantSessions({ PIN });
  }

  render() {
    const { sessions } = this.props;

    if (!sessions) {
      return <div>loading</div>;
    }
    return (
      <Wrapper>
        <Header type="home" userRole="participent" />
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
    sessions: state.sessions.participantSessions,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipantSessions }
)(ParticipantProgress);
