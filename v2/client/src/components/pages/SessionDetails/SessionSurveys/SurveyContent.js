import React, { Component } from 'react';
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
  render() {
    return (
      <SurveyContentWrapper>
        <SurveyLinkType>Survey 1 Link </SurveyLinkType>
        <SurveyLinkInfo>
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
