import React from 'react';

import EditEmail from '../../../common/EditEmail';

const SendReminderEmails = ({ sessionDetails, handleAddEmailsClick }) => {
  const surveyType = {
    1: ['pre-day-1', 'post-day-1'],
    2: ['post-day-2'],
    3: ['post-day-3'],
    'special-2-days': ['pre-special', 'post-special'],
    'train-trainers': ['pre-train-trainers', 'post-train-trainers'],
  };

  const links = surveyType[sessionDetails.type].map(item => {
    const surveyURL = `${window.location.host}/survey/${item}&${sessionDetails.shortId}`;
    let url = `https://${surveyURL}`;

    if (process.env.NODE_ENV === 'development') {
      url = `http://${surveyURL}`;
    }

    return url;
  });

  const preSurveyLink = links.find(item => item.includes('pre'));
  const postSurveyLink = links.find(item => item.includes('post'));

  const confirmedEmails = sessionDetails.participantsEmails.filter(
    item => item.status === 'confirmed'
  );

  return (
    <EditEmail
      participantEmails={confirmedEmails}
      type="reminder"
      trainer="name"
      sessionDate={sessionDetails.date}
      sessionType={sessionDetails.type}
      address={sessionDetails.address}
      trainers={sessionDetails.trainers.map(item => item.name).join(' & ')}
      startTime={sessionDetails.startTime}
      endTime={sessionDetails.endTime}
      shortId={sessionDetails.shortId}
      sessionId={sessionDetails._id}
      extraInfo="extraInfo"
      backCallback="onClose"
      preSurveyLink={preSurveyLink}
      postSurveyLink={postSurveyLink}
      handleAddEmailsClick={handleAddEmailsClick}
    />
  );
};

export default SendReminderEmails;
