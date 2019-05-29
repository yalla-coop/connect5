const Response = require('../../models/Response');

module.exports.getSurveyPINs = (SessionId, surveyType) =>
  Response.find({ session: SessionId, surveyType }, { PIN: 1, _id: 0 });
