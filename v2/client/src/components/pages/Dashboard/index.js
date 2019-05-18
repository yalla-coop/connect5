import React, { Component } from 'react';
import axios from 'axios';
import Spin from 'antd/lib/spin';

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

export default class Dashboard extends Component {
  state = {
    stats: {
      sessionCount: 0,
      responseCount: 0,
      participantCount: 0,
      trainerCount: 0,
      responseRate: 0,
    },
    userType: null,
    userName: null,
    loaded: false,
  };

  componentDidMount() {
    // once we have log in sorted userType and name will come from props
    // it can then be removed from state
    // const { userType, userName } = this.props;

    const userType = 'trainer';
    const userName = 'Elysabeth';

    axios
      .post('/api/all/dashboard', { userType })
      .then(response => {
        this.setState({
          stats: response.data.stats,
          userType,
          userName,
          loaded: true,
        });
      })
      .catch(err => {
        this.setState({ loaded: true });
        console.error(err);
      });
  }

  render() {
    const { stats, userType, loaded, userName } = this.state;

    return (
      <Wrapper>
        <Header type="home" />
        {!loaded ? (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        ) : (
          <>
            <TopSection>
              <Title>
                Welcome back, <br />
                {userName}
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
