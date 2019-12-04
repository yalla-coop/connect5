import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors, borders } from '../../../theme';

// antd icons

import {
  DASHBOARD_URL,
  ADD_SESSION_URL,
  TRAINERS_URL,
  MY_GROUP_RESULTS_URL,
  DEMOGRAPHICS_URL,
  MY_RESULTS_URL,
  ALL_RESULTS_URL,
  MY_SESSIONS_URL,
  ALL_SESSIONS_URL,
  MY_GROUP_SESSIONS_URL,
} from '../../../constants/navigationRoutes';

import USER_TYPES from '../../../constants/userTypes';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  height: 64px;
  background-color: ${colors.white};
  border-top: ${borders.button};
  z-index: 2;

  .active {
    font-weight: 500;
    color: ${colors.primary};
  }
`;

const MenuItem = styled(NavLink)`
  position: ${({ position }) => position || 'static'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-decoration: none;
  font-size: 14px;
  color: ${colors.lightPrimary};
  margin-bottom: ${({ margin }) => (margin ? '0.75rem' : 0)};
`;

const MenuIcon = styled.i`
  font-size: 25px;
`;

const VirticalWrapper = styled.div`
  flex-direction: column;
  position: absolute;
  bottom: 55px;
  background: #fff;
  padding: 1rem 2px;
  text-align: center;
  width: 110px;
  border-top: 1px solid;
  border-right: 1px solid;
  border-left: 1px solid;
  z-index: 1;
`;

// RENDERING IS BASED ON KNOWING THE TYPE OF USER
class Navbar extends Component {
  state = {
    activeSub: {},
  };

  handleSubClick = target => {
    const { activeSub } = this.state;
    const targetedKey = activeSub[target];

    this.setState({ activeSub: { [target]: !targetedKey } });
  };

  render() {
    const { role, PIN } = this.props;
    const { activeSub } = this.state;

    return (
      <Wrapper>
        {/* TRAINER */}
        {role === USER_TYPES.trainer && (
          <>
            <MenuItem to={DASHBOARD_URL}>
              <MenuIcon className="fas fa-home" />
              Home
            </MenuItem>
            <MenuItem to={MY_RESULTS_URL}>
              <MenuIcon className="fas fa-poll-h" />
              Results
            </MenuItem>
            <MenuItem to={MY_SESSIONS_URL}>
              <MenuIcon className="far fa-calendar-alt" />
              Sessions
            </MenuItem>
            <MenuItem to={ADD_SESSION_URL}>
              <MenuIcon className="fas fa-plus" />
              Add
            </MenuItem>
          </>
        )}
        {/* ADMIN */}
        {role === USER_TYPES.admin && (
          <>
            <MenuItem to={DASHBOARD_URL}>
              <MenuIcon className="fas fa-home" />
              Home
            </MenuItem>
            <MenuItem
              as="div"
              onClick={() => this.handleSubClick('results')}
              position="relative"
            >
              <MenuIcon className="fas fa-poll-h" />
              Results
              {activeSub.results && (
                <VirticalWrapper>
                  <MenuItem to={MY_RESULTS_URL} block sub margin>
                    <MenuIcon className="fas fa-poll-h" />
                    Your Results
                  </MenuItem>
                  <MenuItem to={ALL_RESULTS_URL} block sub>
                    <MenuIcon className="fas fa-poll-h" />
                    All Results
                  </MenuItem>
                </VirticalWrapper>
              )}
            </MenuItem>
            <MenuItem
              as="div"
              onClick={() => this.handleSubClick('sessions')}
              position="relative"
            >
              <MenuIcon className="far fa-calendar-alt" />
              Sessions
              {activeSub.sessions && (
                <VirticalWrapper>
                  <MenuItem to={MY_SESSIONS_URL} block sub margin>
                    <MenuIcon className="far fa-calendar-alt" />
                    Your Sessions
                  </MenuItem>
                  <MenuItem to={ALL_SESSIONS_URL} block sub>
                    <MenuIcon className="far fa-calendar-alt" />
                    All Sessions
                  </MenuItem>
                </VirticalWrapper>
              )}
            </MenuItem>
            <MenuItem to={TRAINERS_URL}>
              <MenuIcon className="fas fa-users" />
              Trainers
            </MenuItem>
            <MenuItem to={DEMOGRAPHICS_URL}>
              <MenuIcon className="fas fa-chart-pie" />
              People
            </MenuItem>
          </>
        )}
        {/* LOCAL LEAD */}
        {role === USER_TYPES.localLead && (
          <>
            <MenuItem to={DASHBOARD_URL}>
              <MenuIcon className="fas fa-home" />
              Home
            </MenuItem>

            <MenuItem
              as="div"
              onClick={() => this.handleSubClick('results')}
              position="relative"
            >
              <MenuIcon className="fas fa-poll-h" />
              Results
              {activeSub.results && (
                <VirticalWrapper>
                  <MenuItem to={MY_RESULTS_URL} block sub margin>
                    <MenuIcon className="fas fa-poll-h" />
                    Your Results
                  </MenuItem>
                  <MenuItem to={MY_GROUP_RESULTS_URL} block sub>
                    <MenuIcon className="fas fa-poll-h" />
                    Your Group{"'"} Results
                  </MenuItem>
                </VirticalWrapper>
              )}
            </MenuItem>
            <MenuItem
              as="div"
              onClick={() => this.handleSubClick('sessions')}
              position="relative"
            >
              <MenuIcon className="far fa-calendar-alt" />
              Sessions
              {activeSub.sessions && (
                <VirticalWrapper>
                  <MenuItem to={MY_SESSIONS_URL} block sub margin>
                    <MenuIcon className="far fa-calendar-alt" />
                    Your Sessions
                  </MenuItem>
                  <MenuItem to={MY_GROUP_SESSIONS_URL} block sub>
                    <MenuIcon className="far fa-calendar-alt" />
                    Your Group{"'"}s Sessions
                  </MenuItem>
                </VirticalWrapper>
              )}
            </MenuItem>
            <MenuItem to={TRAINERS_URL}>
              <MenuIcon className="fas fa-users" />
              Trainers
            </MenuItem>
          </>
        )}
        {/* USER */}
        {role === USER_TYPES.participant && PIN && (
          <>
            <MenuItem to="/participant-dashboard">
              <MenuIcon className="fas fa-home" />
              Home
            </MenuItem>
            <MenuItem to="/participant/behavioral-insight">
              <MenuIcon className="fas fa-poll-h" />
              Insights
            </MenuItem>
            <MenuItem to="/participant/progress">
              <MenuIcon className="fas fa-tasks" />
              Progress
            </MenuItem>
            <MenuItem to="/sessions-files">
              <MenuIcon className="fas fa-tasks" />
              Materials
            </MenuItem>
          </>
        )}
      </Wrapper>
    );
  }
}

export default Navbar;
