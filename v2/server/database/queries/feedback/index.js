const Response = require('../../models/Response');

// get the total number of responses for a session
module.exports.getResponseCount = sessionId =>
  Response.find({ session: sessionId });
