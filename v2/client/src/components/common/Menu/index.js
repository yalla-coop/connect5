import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  DASHBOARD_URL,
  ADD_SESSION_URL,
  TRAINER_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_RESULTS_URL,
  TRAINERS_URL,
  GROUP_SESSIONS_URL,
  DEMOGRAPHICS_URL,
} from '../../../constants/navigationRoutes';

import USER_TYPES from '../../../constants/userTypes';

import {
  MenuDiv,
  Menu,
  MenuItem,
  MainDiv,
  MenuClose,
  MenuIcon,
} from './Menu.style';

class HumburgerMenu extends Component {
  state = {
    toggleShow: false,
  };

  onClick = () => {
    const { toggleShow } = this.state;
    this.setState({ toggleShow: !toggleShow });
  };

  render() {
    const { toggleShow } = this.state;
    const { viewLevel } = this.props;
    return (
      <>
        <MenuDiv>
          {!toggleShow && (
            <MenuIcon
              className="fas fa-bars"
              onClick={this.onClick}
              style={{ color: '#F7F7F9', padding: '5px 5px 0 0' }}
            />
          )}
          {toggleShow && (
            <Menu>
              <MenuClose className="fas fa-times" onClick={this.onClick} />
              <MainDiv>
                {/* trainer */}
                {viewLevel === USER_TYPES.trainer && (
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
                  </>
                )}

                {/* Admin */}
                {viewLevel === USER_TYPES.admin && (
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
                  </>
                )}

                {/* LOCAL LEAD */}
                {viewLevel === USER_TYPES.localLead && (
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
                  </>
                )}
              </MainDiv>
            </Menu>
          )}
        </MenuDiv>
      </>
    );
  }
}

const mapStateToProps = state => ({
  role: state.auth.role,
  loaded: state.auth.loaded,
  viewLevel: state.viewLevel.viewLevel,
});

export default connect(mapStateToProps)(HumburgerMenu);
