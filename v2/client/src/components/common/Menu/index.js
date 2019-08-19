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
  SIGN_UP_URL,
} from '../../../constants/navigationRoutes';

import USER_TYPES from '../../../constants/userTypes';

import {
  MenuDiv,
  Menu,
  MenuItem,
  MainDiv,
  MenuIcon,
  LogOut,
  OpenIconDiv,
} from './Menu.style';

class HumburgerMenu extends Component {
  state = {
    toggleShow: null,
  };

  componentDidMount() {
    const { isDeskTop } = this.props;
    const toggleShow = !!isDeskTop;
    if (isDeskTop) {
      if (toggleShow) {
        document.getElementById('wrapper').style.marginLeft = '300px';
      }
    } else {
      document.getElementById('wrapper').style.marginLeft = '0';
    }
  }

  componentDidUpdate() {
    const { toggleShow } = this.state;
    const { isDeskTop } = this.props;
    if (isDeskTop) {
      if (toggleShow) {
        document.getElementById('wrapper').style.marginLeft = '300px';
      }
    } else {
      document.getElementById('wrapper').style.marginLeft = '0';
    }
  }

  onClick = () => {
    const { toggleShow } = this.state;
    const { isDeskTop } = this.props;
    this.setState({ toggleShow: !toggleShow }, newState => {
      if (isDeskTop) {
        if (newState.toggleShow) {
          document.getElementById('wrapper').style.marginLeft = '300px';
        } else {
          document.getElementById('wrapper').style.marginLeft = '0';
        }
      }
    });
  };

  render() {
    // console.log(this.state);
    const { toggleShow } = this.state;
    const { role, logout: logoutAction, dark } = this.props;

    return (
      <MenuDiv>
        {role && (
          <OpenIconDiv onClick={this.onClick}>
            <MenuIcon className="fas fa-bars" />
          </OpenIconDiv>
        )}
        {toggleShow && (
          <Menu dark={dark}>
            <MainDiv>
              {/* trainer */}
              {role === USER_TYPES.trainer && (
                <>
                  <MenuItem to={DASHBOARD_URL}>
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
              {role === USER_TYPES.admin && (
                <>
                  <MenuItem to={DASHBOARD_URL}>
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
              {role === USER_TYPES.localLead && (
                <>
                  <MenuItem to={DASHBOARD_URL}>
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
              {role === USER_TYPES.participant && (
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
              {!role && (
                <>
                  <MenuItem to="/login" dark={dark}>
                    <MenuIcon className="fas fa-sign-in-alt" />
                    LOGIN TO YOUR ACCOUNT
                  </MenuItem>
                  <MenuItem to="/participant-login" dark={dark}>
                    <MenuIcon className="fas fa-sign-in-alt" />
                    LOGIN AS ACOURSE PARTICIPANT
                  </MenuItem>
                  <MenuItem to={SIGN_UP_URL} dark={dark}>
                    <MenuIcon className="fas fa-user-plus" />
                    CREATE NEW ACCOUNT
                  </MenuItem>
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
  isDeskTop: state.checkBrowserWidth.isDeskTop,
});

export default connect(
  mapStateToProps,
  { logout }
)(HumburgerMenu);
