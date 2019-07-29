import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Icon, Drawer } from 'antd';

import DrawerContent from './DrawerContent';

import {
  scheduleNewEmail as scheduleNewEmailAction,
  cancelScheduledEmail as cancelScheduledEmailAction,
} from '../../../../actions/sessionAction';

import {
  SurveyContentWrapper,
  SurveyLinkType,
  SurveyLinkInfo,
  SurveyLink,
  CopyLink,
  SurveyLinkWrapper,
  ResponseWrapper,
  FeedbackAction,
  CopyIcon,
} from './SessionSurveys.Style';
import { BackWrapper } from '../SessionDetails.Style';

class SurveyContent extends Component {
  state = {
    responseCount: 0,
    visible: false,
    drawerKey: '',
    scheduledDate: null,
  };

  componentDidMount() {
    const { id, type } = this.props;
    const sessionId = id;

    axios
      .post('/api/feedback/responseCount', { sessionId, surveyType: type })
      .then(res => {
        this.setState({ responseCount: res.data });
      });
  }

  // Fire Info pop up
  onInfoClick = () => {
    Swal.fire({
      title: 'Info',
      text:
        'Please copy and send the survey link to all participants. You will see the survey results for your session as soon as they are being submitted',
      type: 'info',
      confirmButtonText: 'Ok',
    });
  };

  // Copy the link of the survey and fire pop up for success
  onCopyClick = subId => {
    const copyText = document.getElementById(`link${subId}`);
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
      Swal.fire({
        title: 'Success',
        text: 'Link copied!',
        type: 'success',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Unable to cop the Link',
        type: 'error',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    }
  };

  handleCloseDrawer = () => {
    this.setState({
      visible: false,
      drawerKey: null,
    });
  };

  handleDrawerOpen = e => {
    const { key } = e.target.dataset;
    this.setState({
      visible: true,
      drawerKey: key,
    });
  };

  handleSelectDate = (date, dateString) => {
    this.setState({ scheduledDate: dateString });
  };

  handleSubmitSchedule = () => {
    const { scheduledDate } = this.state;
    const { scheduleNewEmail, sessionDetails, type } = this.props;
    if (scheduledDate) {
      scheduleNewEmail(
        {
          date: scheduledDate,
          sessionId: sessionDetails._id,
          surveyType: type,
        },
        this.handleCloseDrawer
      );
    }
  };

  handleCancelEmail = emailId => {
    const { cancelScheduledEmail, sessionDetails } = this.props;

    cancelScheduledEmail({
      sessionId: sessionDetails._id,
      scheduledEmailId: emailId,
    });
  };

  render() {
    const {
      onInfoClick,
      onCopyClick,
      handleSelectDate,
      handleSubmitSchedule,
      handleCancelEmail,
    } = this;
    const {
      type,
      surveyURL,
      subId,
      id,
      handleEmailing,
      sessionDetails,
      loading,
    } = this.props;
    const { responseCount, drawerKey, visible } = this.state;
    const { scheduledEmails } = sessionDetails;

    let url = `https://${surveyURL}`;

    if (process.env.NODE_ENV === 'development') {
      url = `http://${surveyURL}`;
    }

    return (
      <SurveyContentWrapper>
        <SurveyLinkType to={`/survey/${id}/${type}/results`}>
          {type.includes('pre') ? 'Pre-Session' : 'Post-Session'} Survey
        </SurveyLinkType>

        <SurveyLinkInfo onClick={onInfoClick}>
          <Icon type="info-circle" />
        </SurveyLinkInfo>

        <SurveyLinkWrapper>
          <SurveyLink
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            id={`link${subId}`}
          >
            {url}
          </SurveyLink>
          <CopyLink onClick={() => onCopyClick(subId)}>
            <CopyIcon className="far fa-copy"></CopyIcon>
          </CopyLink>
        </SurveyLinkWrapper>
        <ResponseWrapper>
          <p>
            Responses: <b>{responseCount}</b> out of{' '}
            <b>{sessionDetails && sessionDetails.numberOfAttendees}</b>{' '}
            attendees
          </p>
        </ResponseWrapper>
        <FeedbackAction to="#" onClick={() => handleEmailing(url, type)}>
          <p>Email survey to attendees</p>
          <Icon type="right" />
        </FeedbackAction>
        <FeedbackAction
          as="div"
          onClick={this.handleDrawerOpen}
          data-key="scheduleTable"
        >
          <p>Schedule emails</p>
          <Icon type="right" />
        </FeedbackAction>
        <FeedbackAction to={`/survey/${id}/${type}/results`}>
          <p>View survey results</p>
          <Icon type="right" />
        </FeedbackAction>

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
                loading={loading}
                type={type}
                drawerKey={drawerKey}
                scheduledEmails={scheduledEmails}
                handleSelectDate={handleSelectDate}
                handleSubmitSchedule={handleSubmitSchedule}
                handleCancelEmail={handleCancelEmail}
              />
            </>
          </Drawer>
        </div>
      </SurveyContentWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.sessions.sessionDetails[0],
    loading: state.session.loading,
  };
};
export default connect(
  mapStateToProps,
  {
    scheduleNewEmail: scheduleNewEmailAction,
    cancelScheduledEmail: cancelScheduledEmailAction,
  }
)(SurveyContent);
