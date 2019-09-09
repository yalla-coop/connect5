import React from 'react';

import EditEmail from '../../../common/EditEmail';

const SendSurveyLink = ({
  sessionDetails,
  handleAddEmailsClick,
  name,
  isSchedule,
  surveyType,
  drawerKey,
}) => {
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
      drawerKey={drawerKey}
    />
  );
};

export default SendSurveyLink;
