// Load models
const Response = require('../../models/Response');
const Session = require('../../models/Session');

const storeResponse = async (PIN, sessionId, surveyType) => {
  const sessionInfo = await Session.findById(sessionId);

  const response = new Response({
    PIN,
    session: sessionId,
    trainers: sessionInfo.trainers,
    surveyType,
  });

  await response.save();

  return response;
};

module.exports = storeResponse;
