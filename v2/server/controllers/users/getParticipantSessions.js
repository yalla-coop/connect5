const boom = require('boom');

const participantSessionsQuery = require('../../database/queries/users/participantSessionQuery');

const surveyTypes = {
  1: ['pre-day-1', 'post-day-1'],
  2: ['post-day-2'],
  3: ['post-day-3'],
  'special-2-days': ['pre-special', 'post-special'],
  'train-trainers': ['pre-train-trainers', 'post-train-trainers'],
};

const getParticipantSessions = async (req, res, next) => {
  const { id: pin } = req.params;
  try {
    const sessions = await participantSessionsQuery(pin);

    // return the completed sessions (must have the post and the -pre if session has pre survey-)
    const sessionsWithStatus = sessions.map(session => {
      const sessionType = session.sessions.type;
      const completedSurveys = session.surveyType;
      const completed = surveyTypes[sessionType].every(type =>
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
