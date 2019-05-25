import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import {
  SessionActionsWrapper,
  SessionAction,
  SessionActionLink,
  IconName,
} from './SessionActions.Style';

class SessionActions extends Component {
  render() {
    return (
      <SessionActionsWrapper>
        <SessionAction>
          <SessionActionLink to="/">
            <Icon
              type="edit"
              style={{ width: '2rem', height: '2rem', color: '#08c' }}
            />
            <IconName>Edit Session</IconName>
          </SessionActionLink>
        </SessionAction>
        <SessionAction>
          <SessionActionLink to="/">
            <Icon
              type="delete"
              style={{ width: '2rem', height: '2rem', color: 'red' }}
            />
            <IconName>Delete Session</IconName>
          </SessionActionLink>
        </SessionAction>
      </SessionActionsWrapper>
    );
  }
}

export default connect(
  null
  // { fetchTrainerNames }
)(SessionActions);
