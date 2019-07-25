import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer } from 'antd';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  SubDetailsContent,
  DrawerLink,
  Row,
  Edit,
} from './SessionDetails.Style';

class ManageAttendees extends Component {
  state = { visible: false, drawerKey: null };

  onClose = () => {
    this.setState({ visible: false, drawerKey: null });
  };

  handleDrawerOpen = e => {
    const { key } = e.target.dataset;
    this.setState({ visible: true, drawerKey: key });
  };

  render() {
    const { visible, drawerKey } = this.state;
    return (
      <SessionTopDetailsWrapper>
        <SubDetails>
          <DrawerLink>Confirmed attendees:</DrawerLink>
          <SubDetailsContent to="/"> 15</SubDetailsContent>
          <Edit>Edit</Edit>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.handleDrawerOpen} data-key="viewAttendeesList">
            <DrawerLink>View Attendees List</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.handleDrawerOpen} data-key="addAttendees">
            <DrawerLink>Add Attendees</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.handleDrawerOpen} data-key="sendEmails">
            <DrawerLink>Send session info email reminder</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.handleDrawerOpen} data-key="viewEmails">
            <DrawerLink>View emails you have sent</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <Drawer
          title={<span>Hello</span>}
          placement="left"
          width="100%"
          height="100%"
          onClose={this.onClose}
          visible={visible}
          closable
          getContainer
        >
          <DrawerContent drawerKey={drawerKey} />
        </Drawer>
      </SessionTopDetailsWrapper>
    );
  }
}
export default connect(null)(ManageAttendees);

const DrawerContent = ({ drawerKey }) => {
  switch (drawerKey) {
    case 'viewAttendeesList':
      break;

    default:
      break;
  }
};
