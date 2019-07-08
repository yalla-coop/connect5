const boom = require('boom');
const fromParticipant = require('../../database/queries/feedback/fromParticipant');
const getParticipantSessions = require('./../../database/queries/users/participantSessionQuery');

module.exports = async (req, res, next) => {
  const { PIN } = req.params;
  try {
    const [feedback, sessions] = await Promise.all([
      fromParticipant(PIN),
      getParticipantSessions(PIN),
    ]);

    res.json({ feedback, sessions });
  } catch (error) {
    next(boom.badImplementation());
  }
};
