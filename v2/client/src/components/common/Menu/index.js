import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authAction';

import {
  DASHBOARD_URL,
  ADD_SESSION_URL,
  TRAINER_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_RESULTS_URL,
  TRAINERS_URL,
  GROUP_SESSIONS_URL,
  DEMOGRAPHICS_URL,
  DECIDE_VIEW_URL,
} from '../../../constants/navigationRoutes';

import USER_TYPES from '../../../constants/userTypes';

import {
  MenuDiv,
  Menu,
  MenuItem,
  MainDiv,
  MenuClose,
  MenuIcon,
  LogOut,
  OpenIconDiv,
} from './Menu.style';

class HumburgerMenu extends Component {
  state = {
    toggleShow: false,
  };

  onClick = () => {
    const { toggleShow } = this.state;
    this.setState({ toggleShow: !toggleShow }, () => {
      setTimeout(() => console.log(toggleShow), 3000);
      if (!toggleShow) {
        document.getElementById('wrapper').style.marginLeft = '300px';
      }
      if (toggleShow) {
        document.getElementById('wrapper').style.marginLeft = '0';
      }
    });
  };

  render() {
    const { toggleShow } = this.state;
    const { role, viewLevel, logout: logoutAction } = this.props;
    return (
      <MenuDiv>
        <OpenIconDiv onClick={this.onClick}>
          <MenuIcon className="fas fa-bars" />
        </OpenIconDiv>

        {toggleShow && (
          <Menu>
            <MainDiv>
              {/* trainer */}
              {viewLevel === USER_TYPES.trainer && (
                <>
                  <MenuItem
                    to={role === 'trainer' ? DASHBOARD_URL : DECIDE_VIEW_URL}
                  >
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
                  <LogOut onClick={logoutAction}>
                    <MenuIcon className="fas fa-sign-out-alt" />
                    Logout
                  </LogOut>
                </>
              )}

              {/* Admin */}
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
                  <LogOut onClick={logoutAction}>
                    <MenuIcon className="fas fa-sign-out-alt" />
                    Logout
                  </LogOut>
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
                  <LogOut onClick={logoutAction}>
                    <MenuIcon className="fas fa-sign-out-alt" />
                    Logout
                  </LogOut>
                </>
              )}
              {/* USER */}
              {viewLevel === USER_TYPES.participant && (
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
                  <LogOut onClick={logoutAction}>
                    <MenuIcon className="fas fa-sign-out-alt" />
                    Logout
                  </LogOut>
                </>
              )}
            </MainDiv>
          </Menu>
        )}
      </MenuDiv>
    );
  }
}

const mapStateToProps = state => ({
  role: state.auth.role,
  loaded: state.auth.loaded,
  viewLevel: state.viewLevel.viewLevel,
});

export default connect(
  mapStateToProps,
  { logout }
)(HumburgerMenu);
