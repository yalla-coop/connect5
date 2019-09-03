const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  trainer,
  recipients,
  sendDate,
  sessionDate,
  sessionType,
  trainers,
  startTime,
  endTime,
  address,
  extraInformation,
  confirmedEmails,
}) => {
  const newEmailsObj = recipients.map(email => {
    if (email.status === 'new') {
      // eslint-disable-next-line no-param-reassign
      email.status = 'sent';
    }
    return email;
  });

  const newEmails = newEmailsObj.map(email => email.email);

  const data = {
    sendDate,
    trainer,
    sessionDate,
    sessionType,
    address,
    trainers,
    recipients: newEmails,
    startTime,
    endTime,
    extraInformation,
    type: 'registration',
  };

  const updateDoc = Session.update(
    { _id },
    {
      $push: { sentEmails: data },
      $set: { participantsEmails: [...newEmailsObj, ...confirmedEmails] },
    }
  );
  return updateDoc;
};
