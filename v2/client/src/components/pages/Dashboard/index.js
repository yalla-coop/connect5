import React, { Component } from 'react';

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
} from './Dashboard.style';

import Header from '../../common/Header';

export default class Dashboard extends Component {
  state = {
    stats: null,
  };

  render() {
    const { userType } = this.props;

    return (
      <Wrapper>
        <Header type="home" />
        <TopSection>
          <Title>
            Welcome back, <br />
            Elysabeth
          </Title>
          <Role>Role: Trainer</Role>
        </TopSection>
        <StatsWrapper>
          <StatItem>
            <Label>Session</Label>
            <StatNumber>17</StatNumber>
          </StatItem>
          <StatItem>
            <Label>Session</Label>
            <StatNumber>17</StatNumber>
          </StatItem>
          <StatItem>
            <Label>Session</Label>
            <StatNumber>17</StatNumber>
          </StatItem>
          <StatItem>
            <Label>Session</Label>
            <StatNumber>17</StatNumber>
          </StatItem>
        </StatsWrapper>
        <StyledLink to="/change-password">Change Password</StyledLink>
        <StyledLink to="/logout">Log out</StyledLink>
      </Wrapper>
    );
  }
}
