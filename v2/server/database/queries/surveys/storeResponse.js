// Load models
const Response = require('../../models/Response');
const Session = require('../../models/Session');

const storeResponse = async (PIN, sessionId, surveyType, agreedToResearch) => {
  const sessionInfo = await Session.findById(sessionId);

  const response = new Response({
    PIN,
    session: sessionId,
    trainers: sessionInfo.trainers,
    surveyType,
    agreedToResearch,
  });

  await response.save();

  return response;
};

module.exports = storeResponse;
