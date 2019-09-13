/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal as AntdModal } from 'antd';

import SurveyContent from './SurveyContent';
import {
  updateEmails,
  sendEmails,
} from '../../../../actions/groupSessionsAction';
import AntdInfoModal from '../../../common/AntdModal';
import {
  SessionSurveysWrapper,
  SessionSurveyContainer,
} from './SessionSurveys.Style';
import { getAllSurveyLinks, getSessionSurveys } from '../../../../helpers';

class SessionSurveys extends Component {
  state = {};

  handleEmailing = (surveyURL, surveyType) => {
    const { sessionDetails } = this.props;
    const { sendEmails } = this.props;

    const { participantsEmails } = sessionDetails;

    if (participantsEmails.length < 1) {
      return AntdModal.error({
        title: 'No participants in this session',
        content:
          'You may need to add participants to be able to send the survey',
      });
    }

    return AntdModal.info({
      title:
        'Do you want to send the survey link to all participants by emails?',
      content: (
        <div>
          <p>click on {'Ok'} to send the survey link to all the participants</p>
        </div>
      ),
      onOk() {
        sendEmails({
          surveyURL,
          participantsList: participantsEmails,
          surveyType,
        });
      },
    });
  };

  render() {
    const { sessionDetails, handleDrawerOpen } = this.props;
    const { type, _id, shortId } = sessionDetails;

    const links = getAllSurveyLinks(type, shortId);

    const content =
      'To share the surveys for this session please share the link with your attendees. You can send it directly via email clicking on "Email surveys to attendees" or schedule emails using the "Schedule emails" option.';
    return (
      <SessionSurveysWrapper>
        <AntdInfoModal
          title="About this section"
          content={content}
          btnStyle={{ margin: '1.5rem' }}
          style={{ top: '20' }}
        />
        <SessionSurveyContainer>
          {getSessionSurveys(type).map((survey, index) => {
            return (
              <SurveyContent
                subId={survey}
                type={survey}
                surveyURL={links[index]}
                id={_id}
                handleEmailing={this.handleEmailing}
                key={survey}
                handleDrawerOpen={handleDrawerOpen}
              />
            );
          })}
        </SessionSurveyContainer>
      </SessionSurveysWrapper>
    );
  }
}

const mapStateToProps = state => ({
  emailSuccess: state.groups.emailSuccess,
});

export default connect(
  mapStateToProps,
  { updateEmails, sendEmails }
)(SessionSurveys);
