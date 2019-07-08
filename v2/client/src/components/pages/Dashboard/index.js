import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spin from 'antd/lib/spin';

import { fetchStatsData } from '../../../actions/users';
import { logout } from '../../../actions/authAction';

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  Role,
  StatsWrapper,
  StatItem,
  Label,
  StatNumber,
  StyledLink,
  SpinWrapper,
  LogOut,
} from './Dashboard.style';

//  COMMON COMPONENTS
import Header from '../../common/Header';

// ROUTES
import {
  TRAINER_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_RESULTS_URL,
  TRAINERS_URL,
  GROUP_SESSIONS_URL,
} from '../../../constants/navigationRoutes';

class Dashboard extends Component {
  componentDidMount() {
    // once we have log in sorted role and name will come from props
    // it can then be removed from state
    // const { role, userName } = this.props;
    // const role = 'trainer';
    const {
      role,
      fetchStatsData: fetchStatsDataActionCreator,
      viewLevel,
    } = this.props;

    // if (viewLevel) role = viewLevel;

    fetchStatsDataActionCreator(viewLevel || role);
    // this.setState({ userType });
    // const { fetchStatsData: fetchStatsDataActionCreator } = this.props;
    // fetchStatsDataActionCreator(userType);
  }

  render() {
    const { userName, stats, viewLevel, logout: logoutAction } = this.props;
    // const { id } = auth;

    const captalizesName =
      userName && userName[0].toUpperCase() + userName.substr(1);

    return (
      <Wrapper>
        <Header type="home" />
        {!stats.loaded ? (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        ) : (
          <>
            <TopSection>
              <Title>
                Welcome back, <br />
                {captalizesName}
              </Title>
              <Role>Role: {viewLevel}</Role>
            </TopSection>
            <StatsWrapper>
              <StatItem
                to={
                  viewLevel === 'trainer'
                    ? TRAINER_SESSIONS_URL
                    : GROUP_SESSIONS_URL
                }
              >
                <Label>Sessions</Label>
                <StatNumber>{stats.sessionCount}</StatNumber>
              </StatItem>
              <StatItem
                to={
                  viewLevel === 'trainer'
                    ? TRAINER_RESULTS_URL
                    : GROUP_RESULTS_URL
                }
              >
                <Label>Participants</Label>
                <StatNumber>{stats.participantCount}</StatNumber>
              </StatItem>
              <StatItem
                to={
                  viewLevel === 'trainer'
                    ? TRAINER_RESULTS_URL
                    : GROUP_RESULTS_URL
                }
              >
                <Label>Responses</Label>
                <StatNumber>{stats.responseCount}</StatNumber>
              </StatItem>
              {viewLevel === 'trainer' ? (
                <StatItem to={TRAINER_RESULTS_URL}>
                  <Label>Response Rate</Label>
                  <StatNumber>{stats.responseRate}%</StatNumber>
                </StatItem>
              ) : (
                <StatItem to={TRAINERS_URL}>
                  <Label>Trainers</Label>
                  <StatNumber>{stats.trainerCount}</StatNumber>
                </StatItem>
              )}
            </StatsWrapper>
            <StyledLink to="/change-password">Change Password</StyledLink>
            <LogOut onClick={logoutAction}>Log out</LogOut>
          </>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.auth.name,
    stats: state.stats,
    userId: state.auth.id,
    role: state.auth.role,
    viewLevel: state.viewLevel.viewLevel,
  };
};

export default connect(
  mapStateToProps,
  { fetchStatsData, logout }
)(Dashboard);
