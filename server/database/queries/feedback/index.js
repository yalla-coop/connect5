const Response = require('../../models/Response');

// get the total number of responses for a session
module.exports.getResponseCount = (sessionId, surveyType) =>
  Response.find({ session: sessionId, surveyType });
