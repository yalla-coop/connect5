import React from 'react';
import moment from 'moment';
import EmailTemplate from '../../../common/EmailTemplate';

const ScheduledEmailPreview = ({
  scheduledEmails,
  emailId,
  sessionDetails,
}) => {
  const email = scheduledEmails.find(({ _id }) => _id === emailId);

  const {
    date: sessionDate,
    type: sessionType,
    address,
    trainers,
    startTime,
    endTime,
    shortId,
  } = sessionDetails;

  const trainersNames = trainers
    .map(trainer => `${trainer.name[0].toUpperCase()}${trainer.name.slice(1)}`)
    .join(' & ');

  return (
    <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto' }}>
      <EmailTemplate
        type="surveyLink"
        sessionDate={sessionDate}
        sessionType={sessionType}
        address={address}
        trainers={trainersNames}
        startTime={startTime}
        endTime={endTime}
        extraInformation={email.extraInformation}
        surveyType={email.surveyType}
        shortId={shortId}
        recipients={email.recipients}
        scheduleTime={moment(email.date).format('DD MMM YYYY hh:mm A')}
      />
    </div>
  );
};

export default ScheduledEmailPreview;
