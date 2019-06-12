import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Icon } from 'antd';
import SurveyResultLink from './SurveyResultLink';
import {
  SurveyContentWrapper,
  SurveyLinkType,
  SurveyLinkInfo,
  ViewResultIcon,
  SurveyLink,
  CopyLink,
  MailLink,
  IconName,
} from './SessionSurveys.Style';

class SurveyContent extends Component {
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
    const { type, surveyURL, subId, id } = this.props;
    return (
      <SurveyContentWrapper>
        <SurveyLinkType to={`/survey/${id}/${type}/results`}>
          {type === 'Pre-session' ? 'Pre-Session' : 'Post-Session'} Survey Link
          {/* <ViewResultIcon>
            <Icon type="arrow-right" />
          </ViewResultIcon> */}
        </SurveyLinkType>

        <SurveyLinkInfo onClick={onInfoClick}>
          <Icon type="info-circle" />
        </SurveyLinkInfo>

        <SurveyLink
          href={surveyURL}
          target="_blank"
          rel="noopener noreferrer"
          id={`link${subId}`}
        >
          {surveyURL}
        </SurveyLink>

        <CopyLink onClick={() => onCopyClick(subId)}>
          <Icon type="copy" />
          <IconName>Copy Link</IconName>
        </CopyLink>

        <MailLink>
          <Icon type="mail" />
          <IconName>Email Survey</IconName>
        </MailLink>

        <SurveyResultLink type={type} id={id} />
      </SurveyContentWrapper>
    );
  }
}

export default SurveyContent;
