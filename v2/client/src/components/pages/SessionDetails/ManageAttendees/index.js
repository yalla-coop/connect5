import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer, Modal, Popover, message } from 'antd';
import * as Yup from 'yup';
import moment from 'moment';

import {
  updateSessionAttendeesList as updateSessionAttendeesListAction,
  sendEmailReminder as sendEmailReminderAction,
} from '../../../../actions/sessionAction';

import AntdModal from '../../../common/AntdModal';

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
    focused: false,
  };

  componentDidMount() {
    let dT = null;
    try {
      dT = new DataTransfer();
    } catch (e) {
      // ignore the error
    }
    const evt = new ClipboardEvent('paste', { clipboardData: dT });
    (evt.clipboardData || window.clipboardData).setData('text/plain', '');
    document.addEventListener('paste', this.pasteEmails);
    document.dispatchEvent(evt);

    this.setListIntoState();
  }

  componentDidUpdate() {
    const { lastUpdate } = this.state;
    const { sessionDetails } = this.props;
    if (lastUpdate !== sessionDetails.updatedAt) {
      this.setListIntoState();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  handleDrawerOpen = e => {
    const { key, emailIndex, target } = e.target.dataset;
    this.setState({
      visible: true,
      drawerKey: key,
      activeEmailIndex: emailIndex,
      target,
    });
  };

  handleUpdateAttendees = values => {
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

  onCopy = () => {
    const { target, addedAttendeesList, confirmedAttendeesList } = this.state;
    let dataForCopy;
    switch (target) {
      case 'add':
        dataForCopy = addedAttendeesList;
        break;

      case 'update':
        dataForCopy = confirmedAttendeesList;
        break;

      default:
        dataForCopy = [];
        break;
    }

    if (dataForCopy.length) {
      navigator.clipboard.writeText(dataForCopy.join(';'));
      message.success('Copied');
    }
  };

  onClear = () => {
    const { target } = this.state;
    let clearTarget;
    switch (target) {
      case 'add':
        clearTarget = 'addedAttendeesList';
        break;

      case 'update':
        clearTarget = 'confirmedAttendeesList';
        break;

      default:
        clearTarget = [];
        break;
    }

    this.setState({ [clearTarget]: [] });
  };

  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  onSelectFocus = () => {
    this.setState({ focused: true });
  };

  pasteEmails = event => {
    const { target, focused } = this.state;

    let emailsArray;

    if (focused) {
      event.preventDefault();
      const pastedString = event.clipboardData.getData('text/plain');
      const splittedEmails = pastedString.split(';');
      if (pastedString === splittedEmails) {
        emailsArray = pastedString.split(';');
      }
      emailsArray = splittedEmails.map(item => item.trim());

      switch (target) {
        case 'update':
          this.handleUpdateAttendees(emailsArray);
          break;

        default:
          break;
      }
    }
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
      address: sessionDetails.address,
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
      addedAttendeesList: [],
    });
    this.setListIntoState();
  };

  render() {
    const {
      visible,
      drawerKey,
      confirmedAttendeesList,
      checkedEmails,
      isCheckAll,
      activeEmailIndex,
    } = this.state;

    const { sessionDetails, loading } = this.props;

    const reminderEmails =
      sessionDetails.sentEmails &&
      sessionDetails.sentEmails.filter(item => item.type === 'reminder');

    const activeEmailTemplate =
      reminderEmails && reminderEmails[activeEmailIndex];

    const content =
      'This section provides tools to manage email addresses of confirmed participants. You can edit current lists by clicking on "Manage Attendees", email out session reminders and view previously sent emails.';

    return (
      <SessionTopDetailsWrapper>
        <AntdModal
          title="About this section"
          content={content}
          btnStyle={{ margin: '1.5rem' }}
          style={{ top: '20' }}
        />
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
          <Row
            onClick={this.handleDrawerOpen}
            data-key="viewAttendeesList"
            data-target="update"
          >
            <DrawerLink>Manage Attendees</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        {confirmedAttendeesList.length ? (
          <SubDetails>
            <Row
              onClick={this.handleDrawerOpen}
              data-key="sendEmails"
              data-target="send"
            >
              <DrawerLink>Send session info email reminder</DrawerLink>
              <Icon type="right" />
            </Row>
          </SubDetails>
        ) : (
          <Popover content="No confirmed participants" placement="topLeft">
            <SubDetails>
              <Row disabled>
                <DrawerLink>Send session info email reminder</DrawerLink>
                <Icon type="right" />
              </Row>
            </SubDetails>
          </Popover>
        )}
        <SubDetails>
          <Row onClick={this.handleDrawerOpen} data-key="viewEmails">
            <DrawerLink>View emails you have sent</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <div
          style={{ width: '100%', position: 'absolute', left: 0 }}
          id="parentDiv"
        >
          <Drawer
            placement="left"
            width="100%"
            height="100%"
            onClose={this.handleCloseDrawer}
            visible={visible}
            closable
            bodyStyle={{ background: '#f7f8f9', minHeight: '100%' }}
            getContainer="#parentDiv"
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
                sessionDetails={sessionDetails}
                onSelectBlur={this.onSelectBlur}
                onSelectFocus={this.onSelectFocus}
                // update
                handleSubmitUpdateAttendees={this.handleSubmitUpdateAttendees}
                confirmedAttendeesList={confirmedAttendeesList}
                handleUpdateAttendees={this.handleUpdateAttendees}
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
