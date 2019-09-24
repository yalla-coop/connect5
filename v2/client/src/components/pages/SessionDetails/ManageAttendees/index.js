import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { updateSessionAttendeesList as updateSessionAttendeesListAction } from '../../../../actions/sessionAction';

import AntdModal from '../../../common/AntdModal';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  SubDetailsContent,
  DrawerLink,
  Row,
  Edit,
} from '../SessionDetails.Style';

class ManageAttendees extends Component {
  state = {};

  render() {
    const { handleDrawerOpen, confirmedAttendeesList } = this.props;

    return (
      <SessionTopDetailsWrapper>
        <SubDetails>
          <DrawerLink>Confirmed attendees:</DrawerLink>
          <SubDetailsContent
            to="/"
            style={{ paddingLeft: '0.5rem', fontWeight: '500' }}
          >
            {' '}
            {confirmedAttendeesList.length}
          </SubDetailsContent>
          <Edit onClick={handleDrawerOpen} data-key="viewAttendeesList">
            Edit
          </Edit>
        </SubDetails>
        <SubDetails>
          <Row
            onClick={handleDrawerOpen}
            data-key="viewAttendeesList"
            data-target="update"
          >
            <DrawerLink>Manage Attendees</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <SubDetails>
          <Row
            onClick={handleDrawerOpen}
            data-key="specialRequirements"
            data-target="specialRequirements"
          >
            <DrawerLink>View special requirements</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <SubDetails>
          <Row
            onClick={handleDrawerOpen}
            data-key="sendEmails"
            data-target="send"
          >
            <DrawerLink>Send session info email reminder</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <SubDetails>
          <Row onClick={handleDrawerOpen} data-key="viewEmails">
            <DrawerLink>View emails you have sent</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
      </SessionTopDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.session.loading,
    name: state.auth.name,
  };
};

export default connect(
  mapStateToProps,
  {
    updateSessionAttendeesList: updateSessionAttendeesListAction,
  }
)(ManageAttendees);
