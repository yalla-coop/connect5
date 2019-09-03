const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  trainer,
  recipients,
  sendDate,
  date,
  type,
  trainers,
  startTime,
  endTime,
  address,
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
    sessionDate: date,
    sessionType: type,
    address,
    trainers,
    recipients: newEmails,
    startTime,
    endTime,
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
