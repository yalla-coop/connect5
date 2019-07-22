const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  name,
  participantsEmails,
  sendingDate,
  date,
  type,
  trainerName,
  region,
}) => {
  const data = {
    date: sendingDate,
    trainer: name,
    sessionDate: date,
    sessionType: type,
    location: region,
    trainers: trainerName,
    recipients: participantsEmails,
  };
  return Session.update({ _id }, { $push: { sentEmails: data } });
};
