/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapse from 'antd/lib/collapse';
import * as Yup from 'yup';
import { Icon, Drawer, Modal, message } from 'antd';

import { fetchSessionDetails } from '../../../actions/groupSessionsAction';
import {
  updateSessionAttendeesList as updateSessionAttendeesListAction,
  scheduleNewEmail as scheduleNewEmailAction,
  cancelScheduledEmail as cancelScheduledEmailAction,
} from '../../../actions/sessionAction';

// ANTD COMPONENTS
import Spin from '../../common/Spin';

// COMMON COMPONENTS
import Header from '../../common/Header';

// STYLING
import { SessionDetailsWrapper, BackWrapper } from './SessionDetails.Style';

// SUB COMPONENTS
import SessionTopDetails from './SessionTopDetails';
import SessionActions from './SessionActions';
import SessionSurveys from './SessionSurveys';
import ManageAttendees from './ManageAttendees';
import InviteAndPromote from './InviteAndPromote';
import DrawerContent from './DrawerContent';

const { Panel } = Collapse;

// to validate emails
const emailSchema = Yup.string()
  .email()
  .required();

class SessionDetails extends Component {
  state = {
    openSection: '1',
    visible: false,
    drawerKey: null,
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

    const { id } = this.props.match.params;
    // call action and pass it the id of session to fetch it's details
    this.props.fetchSessionDetails(id);
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

  callback = key => {
    this.setState({ openSection: key });
  };

  setListIntoState = () => {
    const { sessionDetails = {} } = this.props;
    const { participantsEmails = [], sentEmails = [] } = sessionDetails;
    const newEmails = participantsEmails
      .filter(item => {
        return item.status === 'new';
      })
      .map(item => item.email);

    const sentEmailsList = participantsEmails
      .filter(item => item.status === 'sent')
      .map(item => item.email);

    const confirmedEmails = participantsEmails
      .filter(item => item.status === 'confirmed')
      .map(item => item.email);

    const reminderEmails = sentEmails.filter(item => item.type === 'reminder');

    this.setState({
      newEmails: [...newEmails, ...sentEmailsList],
      confirmedEmails,
      lastUpdate: sessionDetails.updatedAt,
      reminderEmails,
    });
  };

  // open drawer
  handleDrawerOpen = e => {
    const { key, surveyType } = e.target.dataset;
    this.setState({
      visible: true,
      drawerKey: key,
      surveyType,
    });
  };

  // update the attendees list status = (new || confirmed)
  handleUpdateAttendees = (values, status) => {
    const validEmails = [];
    values.forEach(item => {
      try {
        const validEmail = emailSchema.validateSync(item);

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

    // { newEmails||confirmedEmails: ["emails"]}
    this.setState({ [`${status}Emails`]: validEmails });
  };

  // submit the updated emails
  handleSubmitUpdateAttendees = status => {
    const { confirmedEmails, newEmails, nextKey } = this.state;
    const emailsArray = status === 'new' ? newEmails : confirmedEmails;
    const { sessionDetails, updateSessionAttendeesList } = this.props;
    const participantsEmails = emailsArray.map(item => ({
      email: item,
      status,
    }));

    const callback = nextKey ? this.openNextKey : this.handleCloseDrawer;

    updateSessionAttendeesList({
      sessionId: sessionDetails._id,
      participantsEmails,
      status,
      handleCloseDrawer: callback,
    });
  };

  openNextKey = () => {
    const { nextKey } = this.state;
    this.setState({
      visible: true,
      drawerKey: nextKey,
      surveyType: null,
    });
  };

  onCopy = status => {
    const { newEmails, confirmedEmails } = this.state;
    let dataForCopy;
    switch (status) {
      case 'new':
        dataForCopy = newEmails;
        break;

      case 'confirmed':
        dataForCopy = confirmedEmails;
        break;

      default:
        dataForCopy = [];
        break;
    }

    if (dataForCopy.length) {
      this.setState({ dataForCopy: dataForCopy.join(';') }, () => {
        if (dataForCopy.length) {
          const copyText = document.getElementById('dataForCopy');
          let range;
          let selection;
          if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(copyText);

            range.select();
          } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(copyText);
            selection.removeAllRanges();
            selection.addRange(range);
          }

          try {
            document.execCommand('copy');
            message.success('copied');
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  };

  // to clear the emails list
  onClear = status => {
    this.setState({ [`${status}Emails`]: [] });
  };

  // blur handler for Select component
  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  // focus handler for Select component
  onSelectFocus = () => {
    this.setState({ focused: true });
  };

  // when pasting list of emails in the Select component
  pasteEmails = event => {
    const { focused, drawerKey } = this.state;

    let status = '';
    switch (drawerKey) {
      case 'view-invitees':
        status = 'new';
        break;

      case 'viewAttendeesList':
        status = 'confirmed';
        break;

      default:
        break;
    }

    let emailsArray;

    if (focused) {
      event.preventDefault();
      const pastedString = event.clipboardData.getData('text/plain');
      const splittedEmails = pastedString.split.split(/[, ;]/);

      emailsArray = splittedEmails
        .map(item => item.trim())
        .filter(item => !!item);

      const { [`${status}Emails`]: oldEmails } = this.state;

      this.handleUpdateAttendees([...emailsArray, ...oldEmails], status);
    }
  };

  // close the drawer
  handleCloseDrawer = () => {
    this.setState({
      visible: false,
      drawerKey: null,
      nextKey: null,
    });
    this.setListIntoState();
  };

  // to handle moving from the edit email page to add attendees page
  handleAddEmailsClick = (drawerKey, nextKey) => {
    this.setState({
      visible: true,
      drawerKey,
      nextKey,
    });
  };

  handleCancelEmail = emailId => {
    const { cancelScheduledEmail, sessionDetails } = this.props;

    cancelScheduledEmail({
      sessionId: sessionDetails._id,
      scheduledEmailId: emailId,
    });
  };

  render() {
    const { sessionDetails, name } = this.props;
    const {
      openSection,
      drawerKey,
      loading,
      visible,
      confirmedEmails,
      reminderEmails,
      newEmails,
      surveyType,
      dataForCopy,
    } = this.state;

    if (!sessionDetails) {
      return Spin;
    }

    return (
      <SessionDetailsWrapper>
        <Header type="section" label="Manage Session" />
        <Collapse
          accordion
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <Icon type="down" rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={[openSection]}
          onChange={this.callback}
        >
          <Panel header="Event Details" key="1">
            <SessionTopDetails sessionDetails={sessionDetails} />
            <SessionActions sessionDetails={sessionDetails} />
          </Panel>
          <Panel header="Invite & Promote" key="2">
            <InviteAndPromote
              sessionDetails={sessionDetails}
              handleDrawerOpen={this.handleDrawerOpen}
            />
          </Panel>
          <Panel header="Manage Attendees" key="3">
            <ManageAttendees
              sessionDetails={sessionDetails}
              handleDrawerOpen={this.handleDrawerOpen}
              confirmedAttendeesList={confirmedEmails}
            />
          </Panel>
          <Panel header="Get Feedback" key="4">
            <SessionSurveys
              sessionDetails={sessionDetails}
              handleDrawerOpen={this.handleDrawerOpen}
            />
          </Panel>
        </Collapse>

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
                name={name}
                onCopy={this.onCopy}
                onClear={this.onClear}
                handleCloseDrawer={this.handleCloseDrawer}
                // update
                handleSubmitUpdateAttendees={this.handleSubmitUpdateAttendees}
                confirmedAttendeesList={confirmedEmails}
                handleUpdateAttendees={this.handleUpdateAttendees}
                // sendEmails
                handleAddEmailsClick={this.handleAddEmailsClick}
                // email list
                reminderEmails={reminderEmails}
                handleDrawerOpen={this.handleDrawerOpen}
                // special requirements
                specialRequirements={sessionDetails.specialRequirements}
                //
                newAndSentEmailsList={newEmails}
                // feedback
                handleCancelEmail={this.handleCancelEmail}
                surveyType={surveyType}
                handleSubmitSchedule={this.handleSubmitSchedule}
              />
            </>
          </Drawer>
        </div>
        <div
          id="dataForCopy"
          style={{
            opacity: '0',
            position: 'absolute',
            width: '0',
            hieght: '0',
            // to prevent Y scroll
            left: '-100000rem',
          }}
        >
          {dataForCopy}
        </div>
      </SessionDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.sessions.sessionDetails[0],
    name: state.auth.name,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchSessionDetails,
    updateSessionAttendeesList: updateSessionAttendeesListAction,
    scheduleNewEmail: scheduleNewEmailAction,
    cancelScheduledEmail: cancelScheduledEmailAction,
  }
)(SessionDetails);
