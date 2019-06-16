import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors, borders } from '../../../theme';

// antd icons

import {
  DASHBOARD_URL,
  ADD_SESSION_URL,
  TRAINER_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_RESULTS_URL,
  TRAINERS_URL,
  GROUP_SESSIONS_URL,
  DEMOGRAPHICS_URL,
  USER_INSIGHTS,
  USER_PROGRESS,
  USER_DASHBOARD,
  DECIDE_VIEW_URL,
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

  .active {
    font-weight: 500;
    color: ${colors.primary};
  }
`;

const MenuItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-decoration: none;
  font-size: 14px;
  color: ${colors.lightPrimary};
`;

const MenuIcon = styled.i`
  font-size: 25px;
`;

const Navbar = ({ viewLevel, role }) => {
  // RENDERING IS BASED ON KNOWING THE TYPE OF USER

  return (
    <Wrapper>
      {/* TRAINER */}
      {viewLevel === USER_TYPES.trainer && (
        <>
          <MenuItem to={role === 'trainer' ? DASHBOARD_URL : DECIDE_VIEW_URL}>
            <MenuIcon className="fas fa-home" />
            Home
          </MenuItem>
          <MenuItem to={TRAINER_RESULTS_URL}>
            <MenuIcon className="fas fa-poll-h" />
            Results
          </MenuItem>
          <MenuItem to={TRAINER_SESSIONS_URL}>
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
      {viewLevel === USER_TYPES.admin && (
        <>
          <MenuItem to={DECIDE_VIEW_URL}>
            <MenuIcon className="fas fa-home" />
            Home
          </MenuItem>
          <MenuItem to={GROUP_RESULTS_URL}>
            <MenuIcon className="fas fa-poll-h" />
            Results
          </MenuItem>
          <MenuItem to={GROUP_SESSIONS_URL}>
            <MenuIcon className="far fa-calendar-alt" />
            Sessions
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
      {viewLevel === USER_TYPES.localLead && (
        <>
          <MenuItem to={DECIDE_VIEW_URL}>
            <MenuIcon className="fas fa-home" />
            Home
          </MenuItem>
          <MenuItem to={GROUP_RESULTS_URL}>
            <MenuIcon className="fas fa-poll-h" />
            Results
          </MenuItem>
          <MenuItem to={GROUP_SESSIONS_URL}>
            <MenuIcon className="far fa-calendar-alt" />
            Sessions
          </MenuItem>
          <MenuItem to={TRAINERS_URL}>
            <MenuIcon className="fas fa-users" />
            Trainers
          </MenuItem>
        </>
      )}
      {/* USER */}
      {viewLevel === USER_TYPES.participant && (
        <>
          <MenuItem to={USER_DASHBOARD}>
            <MenuIcon className="fas fa-home" />
            Home
          </MenuItem>
          <MenuItem to={USER_INSIGHTS}>
            <MenuIcon className="fas fa-poll-h" />
            Insights
          </MenuItem>
          <MenuItem to={USER_PROGRESS}>
            <MenuIcon className="fas fa-tasks" />
            Progress
          </MenuItem>
        </>
      )}
    </Wrapper>
  );
};

export default Navbar;
