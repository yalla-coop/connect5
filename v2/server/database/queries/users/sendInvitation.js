const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  name,
  emails,
  sendingDate,
  date,
  type,
  trainerName,
  region,
  startTime,
  endTime,
}) => {
  const newEmailsObj = [];
  emails.map(email => {
    if (email.status === 'new') {
      newEmailsObj.push({
        email: email.email,
        status: 'sent',
      });
    }
  });

  const newEmails = newEmailsObj.map(email => email.email);

  const sentEmailsObj = emails.filter(email => email.status === 'sent');
  const sentEmails = sentEmailsObj.map(email => email.email);
  const emailObjList = [...newEmailsObj, ...sentEmailsObj];
  const emailList = [...sentEmails, ...newEmails];

  const data = {
    sendDate: sendingDate,
    trainer: name,
    sessionDate: date,
    sessionType: type,
    location: region,
    trainers: trainerName,
    recipients: emailList,
    startTime,
    endTime,
    type: 'registration',
  };

  const updateDoc = Session.update(
    { _id },
    { $push: { sentEmails: data, participantsEmails: emailObjList } }
  );
  return updateDoc;
};
