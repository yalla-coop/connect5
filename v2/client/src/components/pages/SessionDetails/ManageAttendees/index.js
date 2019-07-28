import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer, Modal } from 'antd';
import * as Yup from 'yup';
import moment from 'moment';

import {
  updateSessionAttendeesList as updateSessionAttendeesListAction,
  sendEmailReminder as sendEmailReminderAction,
} from '../../../../actions/sessionAction';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  SubDetailsContent,
  DrawerLink,
  Row,
  Edit,
  BackWrapper,
} from '../SessionDetails.Style';

import DrawerContent from './DrawerContent';

const email = Yup.string()
  .email()
  .required();

class ManageAttendees extends Component {
  state = {
    visible: false,
    drawerKey: null,
    confirmedAttendeesList: [],
    addedAttendeesList: [],
    lastUpdate: null,
    checkedEmails: [],
    isCheckAll: true,
    activeEmailIndex: null,
  };

  componentDidMount() {
    this.setListIntoState();
  }

  componentDidUpdate() {
    const { lastUpdate } = this.state;
    const { sessionDetails } = this.props;
    if (lastUpdate !== sessionDetails.updatedAt) {
      this.setListIntoState();
    }
  }

  onClose = () => {
    this.setState({ visible: false, drawerKey: null });
  };

  handleDrawerOpen = e => {
    const { key, emailIndex } = e.target.dataset;
    this.setState({
      visible: true,
      drawerKey: key,
      activeEmailIndex: emailIndex,
    });
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
        Modal.error({
          title: 'Invalid!',
          content: err.errors[0],
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
      handleCloseDrawer: this.handleCloseDrawer,
    });
  };

  setListIntoState = () => {
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

    this.setState({
      confirmedAttendeesList,
      checkedEmails: confirmedAttendeesList,
      lastUpdate: sessionDetails.updatedAt,
    });
  };

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
            Modal.error({
              title: 'Email already confirmed',
              content: 'This Email is already in the confirmed emails',
            });
          }
        }
      } catch (err) {
        Modal.error({
          title: 'Invalid!',
          content: err.errors[0],
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
      handleCloseDrawer: this.handleCloseDrawer,
    });
  };

  changeSelectedEmails = checkedEmails => {
    const { confirmedAttendeesList } = this.state;

    this.setState({
      checkedEmails,
      isCheckAll: checkedEmails.length === confirmedAttendeesList.length,
    });
  };

  onCheckAllChange = e => {
    const { confirmedAttendeesList } = this.state;
    this.setState({
      checkedEmails: e.target.checked ? confirmedAttendeesList : [],
      isCheckAll: e.target.checked,
    });
  };

  submitSendReminderEmail = () => {
    const { sessionDetails, sendEmailReminder } = this.props;
    const { checkedEmails } = this.state;

    const trainers = sessionDetails.trainers
      .map(
        trainer => `${trainer.name[0].toUpperCase()}${trainer.name.slice(1)}`
      )
      .join(' & ');

    const emailData = {
      sessionId: sessionDetails._id,
      shortId: sessionDetails.shortId,
      trainers,
      startTime: sessionDetails.startTime,
      endTime: sessionDetails.endTime,
      sessionType: sessionDetails.type,
      location: sessionDetails.address,
      recipients: checkedEmails,
      type: 'reminder',
      sent: true,
      sessionDate: moment(sessionDetails.date).format('YYYY-MM-DD'),
    };
    sendEmailReminder(emailData, this.handleCloseDrawer);
  };

  handleCloseDrawer = () => {
    this.setState({
      visible: false,
      drawerKey: null,
      activeEmailIndex: null,
    });
  };

  render() {
    const {
      visible,
      drawerKey,
      confirmedAttendeesList,
      addedAttendeesList,
      checkedEmails,
      isCheckAll,
      activeEmailIndex,
    } = this.state;

    const { sessionDetails, loading } = this.props;

    const reminderEmails =
      sessionDetails.sentEmails &&
      sessionDetails.sentEmails.filter(item => item.type === 'reminder');

    const activeEmailTemplate = reminderEmails[activeEmailIndex];

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
          <Edit onClick={this.handleDrawerOpen} data-key="viewAttendeesList">
            Edit
          </Edit>
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

        <div style={{ width: '100%', position: 'absolute', left: 0 }} id="hhh">
          <Drawer
            placement="left"
            width="100%"
            height="100%"
            onClose={this.onClose}
            visible={visible}
            closable
            bodyStyle={{ background: '#f7f8f9', minHeight: '100%' }}
            getContainer="#hhh"
            destroyOnClose
          >
            <>
              <BackWrapper onClick={this.handleCloseDrawer}>
                <Icon type="left" />
                <p
                  style={{
                    marginLeft: '1rem',
                    marginBottom: '0',
                  }}
                >
                  Back
                </p>
              </BackWrapper>
              <DrawerContent
                // All
                drawerKey={drawerKey}
                loading={loading}
                // update
                handleSubmitUpdateAttendees={this.handleSubmitUpdateAttendees}
                confirmedAttendeesList={confirmedAttendeesList}
                handleUpdateAttendees={this.handleUpdateAttendees}
                // add
                handleAddAttendees={this.handleAddAttendees}
                addedAttendeesList={addedAttendeesList}
                submitAddAttendeesList={this.submitAddAttendeesList}
                // sendEmails
                changeSelectedEmails={this.changeSelectedEmails}
                checkedEmails={checkedEmails}
                isCheckAll={isCheckAll}
                onCheckAllChange={this.onCheckAllChange}
                submitSendReminderEmail={this.submitSendReminderEmail}
                // email list
                reminderEmails={reminderEmails}
                handleDrawerOpen={this.handleDrawerOpen}
                // email template
                activeEmailTemplate={activeEmailTemplate}
              />
            </>
          </Drawer>
        </div>
      </SessionTopDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.session.loading,
  };
};

export default connect(
  mapStateToProps,
  {
    updateSessionAttendeesList: updateSessionAttendeesListAction,
    sendEmailReminder: sendEmailReminderAction,
  }
)(ManageAttendees);
