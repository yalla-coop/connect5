// Load models
const Response = require("../../models/Response");
const Session = require("../../models/Session");

const storeResponse = async (sessionId, surveyType, PIN) => {

  const sessionInfo = await Session.findById(sessionId);

  const response = new Response({
    PIN,
    session: sessionId,
    trainers: sessionInfo.trainers,
    surveyType: surveyType,
  });

  await response.save();

  return response;

}

module.exports = storeResponse