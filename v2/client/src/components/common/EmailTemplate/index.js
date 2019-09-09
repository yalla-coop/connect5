import React, { Component } from 'react';
import moment from 'moment';

// COMMON COMPONENTS

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
        <InfoTitle>Message:</InfoTitle>
        <p>Dear course participants,</p>
        {<FirstPargraph type={type} trainer={trainer} />}
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
        />

        <pre>{extraInformation}</pre>

        <p>Sincerely,</p>

        <p>your Connect 5 team.</p>
      </EmailInfo>
    );
  }
}

export default EmailTemplate;

const FirstPargraph = ({ type, trainer }) => {
  switch (type) {
    case 'registration':
      return (
        <p>
          {trainer} has invited you to register for an upcoming Connect 5
          training session.
        </p>
      );
    case 'surveyLink':
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
