const Session = require("./../models/Session");

const getAllAnswers = async (sessionId, trainerId) => {
  const sessions = await Session.findOne({ _id: sessionId, trainer: trainerId });
  return !!sessions;
};
module.exports = getAllAnswers;
