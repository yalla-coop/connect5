const boom = require('boom');

const participantSessionsQuery = require('../../database/queries/users/participantSessionQuery');
const { surveysTypes } = require('./../../constants');

const getParticipantSessions = async (req, res, next) => {
  const { id: pin } = req.params;
  try {
    const sessions = await participantSessionsQuery(pin);

    // return the completed sessions (must have the post and the -pre if session has pre survey-)
    const sessionsWithStatus = sessions.map(session => {
      const sessionType = session.sessions.type;
      const completedSurveys = session.surveyType;
      const completed = surveysTypes[sessionType].every(type =>
        completedSurveys.includes(type)
      );
      return { ...session, completed };
    });

    return res.send(sessionsWithStatus);
  } catch (err) {
    return next(boom.badImplementation());
  }
};

module.exports = getParticipantSessions;
