import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer, Select, Button, notification } from 'antd';
import * as Yup from 'yup';
import { updateSessionAttendeesList as updateSessionAttendeesListAction } from '../../../actions/sessionAction';

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
    confirmedAttendeesList: [],
    addedAttendeesList: [],
  };

  onClose = () => {
    this.setState({ visible: false, drawerKey: null });
  };

  handleDrawerOpen = e => {
    const { key } = e.target.dataset;
    this.setState({ visible: true, drawerKey: key });
  };

  handleUpdateAttendees = async values => {
    const validEmails = [];
    values.forEach(item => {
      try {
        const validEmail = email.validateSync(item);

        if (validEmail) {
          validEmails.push(item);
        }
      } catch (err) {
        notification.error({
          message: 'Invalid!',
          description: err.errors[0],
          placement: 'left',
        });
      }
    });
    this.setState({ confirmedAttendeesList: validEmails });
  };

  handleSubmitUpdateAttendees = () => {
    const { confirmedAttendeesList } = this.state;
    const { sessionDetails, updateSessionAttendeesList } = this.props;
    const updatedList = confirmedAttendeesList.map(item => ({
      email: item,
      status: 'confirmed',
    }));

    updateSessionAttendeesList({
      sessionId: sessionDetails._id,
      attendeesList: updatedList,
      status: 'confirmed',
    });
  };

  componentDidMount() {
    const { sessionDetails } = this.props;
    const confirmedAttendeesList = sessionDetails.participantsEmails.reduce(
      (accu, curr) => {
        if (curr.status === 'confirmed') {
          accu.push(curr.email);
          return accu;
        }
        return accu;
      },
      []
    );
    this.setState({ confirmedAttendeesList });
  }

  handleAddAttendees = values => {
    const { confirmedAttendeesList } = this.state;
    const validEmails = [];
    values.forEach(item => {
      try {
        const validEmail = email.validateSync(item);

        if (validEmail) {
          if (!confirmedAttendeesList.includes(item)) {
            validEmails.push(item);
          } else {
            notification.error({
              message: 'Email already confirmed',
              description: 'This Email is already in the confirmed emails',
              placement: 'left',
            });
          }
        }
      } catch (err) {
        notification.error({
          message: 'Invalid!',
          description: err.errors[0],
          placement: 'left',
        });
      }
    });
    this.setState({ addedAttendeesList: validEmails });
  };

  submitAddAttendeesList = () => {
    // add attendees
    const { addedAttendeesList } = this.state;
    const { sessionDetails, updateSessionAttendeesList } = this.props;
    const updatedList = addedAttendeesList.map(item => ({
      email: item,
      status: 'confirmed',
    }));

    updateSessionAttendeesList({
      sessionId: sessionDetails._id,
      attendeesList: updatedList,
      status: 'confirmed',
    });
  };

  render() {
    const {
      visible,
      drawerKey,
      confirmedAttendeesList,
      addedAttendeesList,
    } = this.state;
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
            // update
            handleSubmitUpdateAttendees={this.handleSubmitUpdateAttendees}
            confirmedAttendeesList={confirmedAttendeesList}
            handleUpdateAttendees={this.handleUpdateAttendees}
            // add
            handleAddAttendees={this.handleAddAttendees}
            addedAttendeesList={addedAttendeesList}
            submitAddAttendeesList={this.submitAddAttendeesList}
          />
        </Drawer>
      </SessionTopDetailsWrapper>
    );
  }
}

const DrawerContent = ({
  drawerKey,
  // update
  handleSubmitUpdateAttendees,
  confirmedAttendeesList,
  handleUpdateAttendees,
  // add
  handleAddAttendees,
  addedAttendeesList,
  submitAddAttendeesList,
}) => {
  switch (drawerKey) {
    case 'viewAttendeesList':
      return (
        <UpdateAttendeesList
          handleSubmitUpdateAttendees={handleSubmitUpdateAttendees}
          confirmedAttendeesList={confirmedAttendeesList}
          handleUpdateAttendees={handleUpdateAttendees}
        />
      );
    case 'addAttendees':
      return (
        <AddAttendees
          addedAttendeesList={addedAttendeesList}
          handleAddAttendees={handleAddAttendees}
          submitAddAttendeesList={submitAddAttendeesList}
        />
      );
    default:
      return <h1>HIII</h1>;
  }
};

const UpdateAttendeesList = ({
  handleSubmitUpdateAttendees,
  confirmedAttendeesList,
  handleUpdateAttendees,
}) => {
  return (
    <DrawerContentWrapper>
      <Select
        mode="tags"
        value={confirmedAttendeesList}
        placeholder="Select users"
        onChange={handleUpdateAttendees}
        style={{ width: '100%' }}
      >
        {confirmedAttendeesList.map(item => (
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
        onClick={handleSubmitUpdateAttendees}
      >
        Update
      </Button>
    </DrawerContentWrapper>
  );
};

const AddAttendees = ({
  handleAddAttendees,
  addedAttendeesList,
  submitAddAttendeesList,
}) => {
  return (
    <DrawerContentWrapper>
      <Select
        mode="tags"
        value={addedAttendeesList}
        placeholder="Select users"
        onChange={handleAddAttendees}
        style={{ width: '100%' }}
      >
        {addedAttendeesList.map(item => (
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
        onClick={submitAddAttendeesList}
      >
        Add Attendees
      </Button>
    </DrawerContentWrapper>
  );
};

const mapStateToProps = state => {
  return {
    localLeads: state.fetchedData.localLeadsList,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
  };
};

export default connect(
  mapStateToProps,
  {
    updateSessionAttendeesList: updateSessionAttendeesListAction,
    // addSessionAttendeesList: addSessionAttendeesListAction,
  }
)(ManageAttendees);
