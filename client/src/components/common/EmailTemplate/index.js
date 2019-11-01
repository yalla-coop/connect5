import React, { Component } from 'react';
import moment from 'moment';

import { Divider } from 'antd';
import { getSurveyLink } from '../../../helpers';

// STYLE
import {
  EmailInfo,
  InfoTitle,
  SessionInfoTitle,
  List,
} from './EmailTemplate.style';

class EmailTemplate extends Component {
  render() {
    const {
      type,
      trainer,
      sessionDate,
      sessionType,
      address,
      trainers,
      startTime,
      endTime,
      extraInformation,
      confirmLink,
      preSurveyLink,
      postSurveyLink,
      surveyType,
      shortId,
      recipients,
      scheduleTime,
    } = this.props;

    let fullAddress = '';

    if (address) {
      const { postcode, addressLine1, addressLine2 } = address;
      if (postcode || addressLine1 || addressLine2) {
        fullAddress = [addressLine1, addressLine2, postcode]
          .filter(item => !!item)
          .join(', ');
      }
    }

    return (
      <EmailInfo>
        {scheduleTime && (
          <div>
            <InfoTitle style={{ display: 'inline' }}>Scheduled At: </InfoTitle>{' '}
            <span>{scheduleTime}</span>
          </div>
        )}
        <InfoTitle>Message:</InfoTitle>
        <p>Dear course participants,</p>
        {
          <FirstPargraph
            type={type}
            trainer={trainer}
            surveyType={surveyType}
          />
        }
        <List>
          <li>
            <SessionInfoTitle> Session Date:</SessionInfoTitle>{' '}
            {moment(sessionDate).format('DD/MM/YYYY')}
          </li>
          <li>
            <SessionInfoTitle>Session Type:</SessionInfoTitle> {sessionType}
          </li>
          <li>
            <SessionInfoTitle>Location:</SessionInfoTitle>{' '}
            {fullAddress || 'TBC'}
          </li>
          <li>
            <SessionInfoTitle>time:</SessionInfoTitle>
            {startTime || '-'} to {endTime || '-'}{' '}
          </li>
          <li>
            <SessionInfoTitle>Trainer(s):</SessionInfoTitle> {trainers}
          </li>
        </List>
        <SecondPargraph
          type={type}
          confirmLink={confirmLink}
          preSurveyLink={preSurveyLink}
          postSurveyLink={postSurveyLink}
          surveyType={surveyType}
          shortId={shortId}
        />

        <pre>{extraInformation}</pre>

        <p>Sincerely,</p>

        <p>your Connect 5 team.</p>

        {recipients && (
          <div>
            <Divider />
            <InfoTitle>
              <span>Send To:</span>
            </InfoTitle>
            {recipients && recipients.map(email => <p key={email}>{email}</p>)}
          </div>
        )}
      </EmailInfo>
    );
  }
}

export default EmailTemplate;

const FirstPargraph = ({ type, trainer, surveyType }) => {
  switch (type) {
    case 'registration':
      return (
        <p>
          <strong>{trainer.toUpperCase()}</strong> has invited you to register
          for an upcoming Connect 5 training session.
        </p>
      );
    case 'surveyLink':
      if (surveyType && surveyType.includes('follow-up')) {
        return (
          <p>
            We{"'"}re looking forward to receiving your{' '}
            {surveyType.includes('3') ? '3' : '6'} months follow up feedback for
            the following Connect 5 training session:
          </p>
        );
      }

      return (
        <p>
          We{"'"}re looking forward to welcome you at our upcoming Connect 5
          training session.
        </p>
      );

    case 'reminder':
      return (
        <p>
          This is a friendly reminder related to the following Connect 5
          training session:
        </p>
      );
    default:
      return null;
  }
};

const SecondPargraph = ({
  type,
  confirmLink,
  preSurveyLink,
  postSurveyLink,
  surveyType,
  shortId,
}) => {
  switch (type) {
    case 'registration':
      return (
        <p>
          To confirm your attendance please click this{' '}
          <a href={confirmLink}>Link</a>{' '}
        </p>
      );

    case 'reminder':
    case 'surveyLink':
      if (surveyType && surveyType.includes('follow-up')) {
        return (
          <>
            <p>
              To track your own progress and to ensure that our trainings are
              effective we rely on course participants to fill out surveys after
              each session. All the data is anonymised.
            </p>
            <p>
              To complete the session please click the following link to fill
              out the {surveyType.includes('3') ? '3' : '6'} month follow up
              survey.
            </p>
            <p>
              <a href={getSurveyLink(surveyType, shortId)}>Follow up survey</a>
            </p>
          </>
        );
      }
      return (
        <>
          <p>
            To track your own progress and to ensure that our trainings are
            effective we would rely on course participants to fill out surveys
            for each session. All the data is anonymised. After answering
            surveys you can immediately see your own progress and access
            certificates via the app.
          </p>
          {preSurveyLink && (
            <p>
              Before starting the training session please follow this link and
              fill out the <a href={preSurveyLink}>pre-survey</a>.
            </p>
          )}
          <p>
            After the session please click this link and fill out the{' '}
            <a href={postSurveyLink}>post-survey</a>.
          </p>
        </>
      );

    default:
      return null;
  }
};
