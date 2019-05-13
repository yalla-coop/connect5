// Load models
const Response = require("../models/Response");
const Session = require("../models/Session");

const storeResponse = async (sessionId, surveyType) => {

  const sessionInfo = await Session.findById(sessionId);

  const response = new Response({
    session: sessionId,
    trainer: sessionInfo.trainer,
    surveyType: surveyType,
  });

  await response.save();

  return response;

}

module.exports = storeResponse