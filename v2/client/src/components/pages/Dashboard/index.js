import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spin from 'antd/lib/spin';

import { fetchStatsData } from '../../../actions/users';

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
} from './Dashboard.style';

import Header from '../../common/Header';

import {
  TRAINER_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_RESULTS_URL,
  TRAINERS_URL,
  GROUP_SESSIONS_URL,
} from '../../../constants/navigationRoutes';

class Dashboard extends Component {
  state = {
    userType: null,
  };

  componentDidMount() {
    // once we have log in sorted userType and name will come from props
    // it can then be removed from state
    // const { userType, userName } = this.props;
    const userType = 'trainer';

    this.setState({ userType });
    const { fetchStatsData: fetchStatsDataActionCreator } = this.props;
    fetchStatsDataActionCreator(userType);
  }

  render() {
    const { userName, stats } = this.props;

    const captalizesName =
      userName && userName[0].toUpperCase() + userName.substr(1);

    const { userType } = this.state;

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
              <Role>Role: {userType}</Role>
            </TopSection>
            <StatsWrapper>
              <StatItem
                to={
                  userType === 'trainer'
                    ? TRAINER_SESSIONS_URL
                    : GROUP_SESSIONS_URL
                }
              >
                <Label>Sessions</Label>
                <StatNumber>{stats.sessionCount}</StatNumber>
              </StatItem>
              <StatItem
                to={
                  userType === 'trainer'
                    ? TRAINER_RESULTS_URL
                    : GROUP_RESULTS_URL
                }
              >
                <Label>Participants</Label>
                <StatNumber>{stats.participantCount}</StatNumber>
              </StatItem>
              <StatItem
                to={
                  userType === 'trainer'
                    ? TRAINER_RESULTS_URL
                    : GROUP_RESULTS_URL
                }
              >
                <Label>Responses</Label>
                <StatNumber>{stats.responseCount}</StatNumber>
              </StatItem>
              {userType === 'trainer' ? (
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
            <StyledLink to="/logout">Log out</StyledLink>
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
  };
};

export default connect(
  mapStateToProps,
  { fetchStatsData }
)(Dashboard);
