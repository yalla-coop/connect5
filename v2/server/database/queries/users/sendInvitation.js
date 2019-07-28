const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  name,
  participantsEmails,
  sendingDate,
  date,
  type,
  trainerName,
  address,
}) => {
  const data = {
    date: sendingDate,
    trainer: name,
    sessionDate: date,
    sessionType: type,
    location: address,
    trainers: trainerName,
    recipients: participantsEmails,
  };

  const emails = participantsEmails.map(email => {
    return {
      email,
      status: 'sent',
    };
  });

  const updateDoc = Session.update(
    { _id },
    { $push: { sentEmails: data, participantsEmails: emails } }
  );
  return updateDoc;
};
