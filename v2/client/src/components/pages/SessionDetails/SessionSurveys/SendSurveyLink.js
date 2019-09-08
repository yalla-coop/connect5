import React from 'react';

import EditEmail from '../../../common/EditEmail';

const SendSurveyLink = ({
  sessionDetails,
  handleAddEmailsClick,
  name,
  isSchedule,
  surveyType,
}) => {
  console.log({ surveyType }, '222222222222');

  const confirmedEmails = sessionDetails.participantsEmails.filter(
    item => item.status === 'confirmed'
  );

  return (
    <EditEmail
      participantsEmails={confirmedEmails}
      type="surveyLink"
      trainer={name}
      sessionDate={sessionDetails.date}
      sessionType={sessionDetails.type}
      address={sessionDetails.address}
      trainers={sessionDetails.trainers}
      startTime={sessionDetails.startTime}
      endTime={sessionDetails.endTime}
      shortId={sessionDetails.shortId}
      sessionId={sessionDetails._id}
      handleAddEmailsClick={handleAddEmailsClick}
      isSchedule={isSchedule}
      surveyType={surveyType}
    />
  );
};

export default SendSurveyLink;
