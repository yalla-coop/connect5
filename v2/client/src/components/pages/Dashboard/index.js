import React, { Component } from 'react';

import {
  Wrapper,
  Header,
  Title,
  Role,
  StatsWrapper,
  StatItem,
  Label,
  StatNumber,
} from './Dashboard.style';

export default class Dashboard extends Component {
  state = {
    stats: null,
  };

  render() {
    const { userType } = this.props;

    return (
      <Wrapper>
        <Header>
          <Title>Welcome back, Elysabeth</Title>
          <Role>Role: Trainer</Role>
        </Header>
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
      </Wrapper>
    );
  }
}
