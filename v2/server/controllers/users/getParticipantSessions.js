const boom = require('boom');

const participantSessionsQuery = require('../../database/queries/users/participantSessionQuery');

const getParticipantSessions = async (req, res, next) => {
  const { id: pin } = req.params;
  try {
    const sessions = await participantSessionsQuery(pin);
    return res.send(sessions);
  } catch (err) {
    return next(boom.badImplementation());
  }
};

module.exports = getParticipantSessions;
