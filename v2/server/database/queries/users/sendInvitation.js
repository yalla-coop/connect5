const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  name,
  emails,
  sendingDate,
  date,
  type,
  trainerName,
  startTime,
  endTime,
  address,
}) => {
  const newEmailsObj = emails.map(email => {
    if (email.status === 'new') {
      // eslint-disable-next-line no-param-reassign
      email.status = 'sent';
    }
    return email;
  });

  const newEmails = newEmailsObj.map(email => email.email);

  const data = {
    sendDate: sendingDate,
    trainer: name,
    sessionDate: date,
    sessionType: type,
    location: address,
    trainers: trainerName,
    recipients: newEmails,
    startTime,
    endTime,
    type: 'registration',
  };

  const updateDoc = Session.update(
    { _id },
    { $push: { sentEmails: data }, $set: { participantsEmails: newEmailsObj } }
  );
  return updateDoc;
};
