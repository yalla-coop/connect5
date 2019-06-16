const Response = require('../../models/Response');
const Session = require('../../models/Session');

module.exports.getSurveyPINs = (sessionId, surveyType) =>
  Response.find({ session: sessionId, surveyType }, { PIN: 1, _id: 0 });

module.exports.getAttendeesNumber = (sessionId, surveyType) => {
  return Session.findById(sessionId, { numberOfAttendees: 1 });
};
