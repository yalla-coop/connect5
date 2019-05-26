import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Icon } from 'antd';
import {
  SurveyContentWrapper,
  SurveyLinkType,
  SurveyLinkInfo,
  SurveyLink,
  CopyLink,
  MailLink,
  IconName,
} from './SessionSurveys.Style';

class SurveyContent extends Component {
  onInfoClick = () => {
    Swal.fire({
      title: 'Info',
      text:
        'Please copy and send the survey link to all participants. You will see the survey results for your session as soon as they are being submitted',
      type: 'info',
      confirmButtonText: 'Ok',
    });
  };

  render() {
    const { onInfoClick } = this;
    return (
      <SurveyContentWrapper>
        <SurveyLinkType>Survey 1 Link </SurveyLinkType>
        <SurveyLinkInfo onClick={onInfoClick}>
          <Icon type="info-circle" />
        </SurveyLinkInfo>
        <SurveyLink to="https://ant.design/components/icons">
          https://ant.design/components/icons
        </SurveyLink>
        <CopyLink>
          <Icon type="copy" />
          <IconName>Copy Link</IconName>
        </CopyLink>
        <MailLink>
          <Icon type="mail" />
          <IconName>Email Survey</IconName>
        </MailLink>
      </SurveyContentWrapper>
    );
  }
}

export default SurveyContent;
