/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Empty } from 'antd';

// COMMON COMPONENTS
import SessionList from '../../common/List/SessionList';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';

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
  HeaderSection,
} from './ViewSessions.Style';

class ViewSessions extends Component {
  state = {
    headerTitle: null,
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

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const { headerTitle, toggle } = this.state;

    const { sessions } = this.props;
    if (!sessions) {
      return <div>loading</div>;
    }
    const upcomingSessions =
      sessions &&
      sessions.filter(item => {
        return moment(item.date).diff(moment(), 'seconds') > 0;
      });

    const selectedSessions = toggle === 'left' ? sessions : upcomingSessions;

    const sortedSessions = selectedSessions.sort(
      (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
    );

    return (
      <ViewSessionsWrapper>
        <Header label={headerTitle} type="section" />
        <TotalSessions>
          <Span>
            {toggle === 'left' ? 'All Sessions:' : 'Upcoming Sessions:'}
          </Span>
          <SessionsCount>
            {selectedSessions && selectedSessions.length}
          </SessionsCount>
        </TotalSessions>
        <HeaderSection>
          <Toggle
            large
            leftText="All Sessions"
            rightText="Upcoming sessions"
            selected={toggle}
            onClick={this.clickToggle}
          />
        </HeaderSection>
        <LinkBtn to="/create-session">Add New Session</LinkBtn>
        {selectedSessions && selectedSessions.length ? (
          <SessionList dataList={sortedSessions} />
        ) : (
          <Empty description="No Sessions!" style={{ marginTop: '3rem' }} />
        )}
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
