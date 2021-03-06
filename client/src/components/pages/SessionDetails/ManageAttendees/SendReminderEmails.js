import React from 'react';

import EditEmail from '../../../common/EditEmail';

const SendReminderEmails = ({
  sessionDetails,
  handleAddEmailsClick,
  name,
  drawerKey,
  onClose,
}) => {
  const confirmedEmails = sessionDetails.participantsEmails.filter(
    item => item.status === 'confirmed'
  );

  return (
    <EditEmail
      participantsEmails={confirmedEmails}
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
      drawerKey={drawerKey}
      backCallback={onClose}
    />
  );
};

export default SendReminderEmails;
