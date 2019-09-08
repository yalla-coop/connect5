import React from 'react';

import EditEmail from '../../../common/EditEmail';

const SendReminderEmails = ({ sessionDetails, handleAddEmailsClick, name }) => {
  const confirmedEmails = sessionDetails.participantsEmails.filter(
    item => item.status === 'confirmed'
  );

  return (
    <EditEmail
      participantEmails={confirmedEmails}
      type="reminder"
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
    />
  );
};

export default SendReminderEmails;
