import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Icon } from 'antd';
import SurveyResultLink from './SurveyResultLink';
import {
  SurveyContentWrapper,
  SurveyLinkType,
  SurveyLinkInfo,
  SurveyLink,
  CopyLink,
  MailLink,
  IconName,
  ActionsDiv,
  SurveyLinkWrapper,
  ResponseWrapper,
  FeedbackAction,
  CopyIcon,
} from './SessionSurveys.Style';

class SurveyContent extends Component {
  state = {
    responseCount: 0,
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

  render() {
    const { onInfoClick, onCopyClick } = this;
    const {
      type,
      surveyURL,
      subId,
      id,
      handleEmailing,
      sessionDetails,
    } = this.props;
    const { responseCount } = this.state;

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
        <FeedbackAction to="/">
          <p>Schedule emails</p>
          <Icon type="right" />
        </FeedbackAction>
        <FeedbackAction to={`/survey/${id}/${type}/results`}>
          <p>View survey results</p>
          <Icon type="right" />
        </FeedbackAction>
      </SurveyContentWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.sessions.sessionDetails[0],
  };
};
export default connect(mapStateToProps)(SurveyContent);
