const Session = require('./../../models/Session');

module.exports.scheduleNewEmail = ({ sessionId, surveyType, date }) =>
  Session.updateOne(
    { _id: sessionId },
    { $push: { scheduledEmails: { surveyType, date } } }
  );
