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
}) => {
  const data = {
    sendDate,
    trainer,
    sessionDate,
    sessionType,
    address,
    trainers,
    recipients: recipients.map(item => item.email),
    startTime,
    endTime,
    extraInformation,
    type: 'registration',
  };

  const updateDoc = Session.update(
    { _id },
    {
      $push: { sentEmails: data },
    }
  );
  return updateDoc;
};
