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
  TotalReach,
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
  MY_RESULTS_URL,
  MY_SESSIONS_URL,
  MY_GROUP_RESULTS_URL,
  MY_GROUP_SESSIONS_URL,
  TRAINERS_URL,
  ALL_SESSIONS_URL,
  ALL_RESULTS_URL,
} from '../../../constants/navigationRoutes';

class Dashboard extends Component {
  componentDidMount() {
    // once we have log in sorted role and name will come from props
    // it can then be removed from state
    // const { role, userName } = this.props;
    // const role = 'trainer';
    const { role, fetchStatsData: fetchStatsDataActionCreator } = this.props;

    fetchStatsDataActionCreator(role);
    // this.setState({ userType });
    // const { fetchStatsData: fetchStatsDataActionCreator } = this.props;
    // fetchStatsDataActionCreator(userType);
  }

  render() {
    const {
      userName,
      stats,
      logout: logoutAction,
      role,
      officialLocalLead,
    } = this.props;

    const captalizesName =
      userName && userName[0].toUpperCase() + userName.substr(1);

    let sessionURL;
    let ResultsURL;

    switch (role) {
      case 'trainer':
        sessionURL = MY_SESSIONS_URL;
        ResultsURL = MY_RESULTS_URL;
        break;

      case 'localLead':
        sessionURL = MY_GROUP_SESSIONS_URL;
        ResultsURL = MY_GROUP_RESULTS_URL;
        break;

      case 'admin':
        sessionURL = ALL_SESSIONS_URL;
        ResultsURL = ALL_RESULTS_URL;
        break;

      default:
        break;
    }

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
              <Role>
                Role:{' '}
                {officialLocalLead && role === 'localLead'
                  ? 'Local Lead'
                  : !officialLocalLead && role === 'localLead'
                  ? 'Trainer Manager'
                  : role}
              </Role>
            </TopSection>
            <TotalReach>Your Total Reach</TotalReach>
            <StatsWrapper>
              <StatItem to={sessionURL}>
                <Label>Sessions</Label>
                <StatNumber>{stats.sessionCount}</StatNumber>
              </StatItem>
              <StatItem to={ResultsURL}>
                <Label>Participants</Label>
                <StatNumber>{stats.participantCount}</StatNumber>
              </StatItem>
              <StatItem to={ResultsURL}>
                <Label>Responses</Label>
                <StatNumber>{stats.responseCount}</StatNumber>
              </StatItem>
              {role === 'trainer' ? (
                <StatItem to={MY_RESULTS_URL}>
                  <Label>Response Rate</Label>
                  <StatNumber>{stats.responseRate || '0'}%</StatNumber>
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
    officialLocalLead: state.auth.officialLocalLead,
  };
};

export default connect(
  mapStateToProps,
  { fetchStatsData, logout }
)(Dashboard);
