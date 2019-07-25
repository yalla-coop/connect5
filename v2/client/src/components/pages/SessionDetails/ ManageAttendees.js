import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer, Select, Button } from 'antd';
import * as Yup from 'yup';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  SubDetailsContent,
  DrawerLink,
  Row,
  Edit,
  DrawerContentWrapper,
} from './SessionDetails.Style';

const email = Yup.string()
  .email()
  .required();

const { Option } = Select;

class ManageAttendees extends Component {
  state = {
    visible: false,
    drawerKey: null,
    attendeesList: [],
  };

  onClose = () => {
    this.setState({ visible: false, drawerKey: null });
  };

  handleDrawerOpen = e => {
    const { key } = e.target.dataset;
    this.setState({ visible: true, drawerKey: key });
  };

  handleAddAttendees = async values => {
    const validEmails = [];
    values.forEach(item => {
      try {
        const validEmail = email.validateSync(item);

        if (validEmail) {
          validEmails.push(item);
        }
      } catch (err) {
        console.log(err.errors[0], 'err');
      }
    });
    this.setState({ attendeesList: validEmails });
  };

  handleUpdateAttendees = () => {
    console.log('update');
  };

  render() {
    const { visible, drawerKey, attendeesList } = this.state;
    return (
      <SessionTopDetailsWrapper>
        <SubDetails>
          <DrawerLink>Confirmed attendees:</DrawerLink>
          <SubDetailsContent to="/"> 150</SubDetailsContent>
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
          title="{<span>Hello</span>}"
          placement="left"
          width="100%"
          height="100%"
          onClose={this.onClose}
          visible={visible}
          closable
          getContainer
        >
          <DrawerContent
            drawerKey={drawerKey}
            handleAddAttendees={this.handleAddAttendees}
            validateAddedAttendees={this.validateAddedAttendees}
            attendeesList={attendeesList}
            handleUpdateAttendees={this.handleUpdateAttendees}
          />
        </Drawer>
      </SessionTopDetailsWrapper>
    );
  }
}

const DrawerContent = ({
  drawerKey,
  handleAddAttendees,
  validateAddedAttendees,
  attendeesList,
  handleUpdateAttendees,
}) => {
  switch (drawerKey) {
    case 'viewAttendeesList':
      return (
        <AttendeesList
          handleAddAttendees={handleAddAttendees}
          validateAddedAttendees={validateAddedAttendees}
          attendeesList={attendeesList}
          handleUpdateAttendees={handleUpdateAttendees}
        />
      );

    default:
      return <h1>HIII</h1>;
  }
};

const AttendeesList = ({
  handleAddAttendees,
  validateAddedAttendees,
  attendeesList,
  handleUpdateAttendees,
}) => {
  return (
    <DrawerContentWrapper>
      <Select
        mode="tags"
        value={attendeesList}
        placeholder="Select users"
        onChange={handleAddAttendees}
        style={{ width: '100%' }}
        filterOption={validateAddedAttendees}
      >
        {attendeesList.map(item => (
          <Option value={item}>{item}</Option>
        ))}
      </Select>

      <Button
        type="primary"
        style={{
          width: '100%',
          marginTop: '2rem',
          fontSize: '19px',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          height: 'auto',
        }}
        onClick={handleUpdateAttendees}
      >
        Primary
      </Button>
    </DrawerContentWrapper>
  );
};

export default connect(null)(ManageAttendees);
