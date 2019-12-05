const boom = require('boom');

const participantSessionsQuery = require('../../database/queries/users/participantSessionQuery');
const {
  findSessionsIncludeParticipantEmail,
} = require('./../../database/queries/user');
const { surveysTypesNoFollowUps: surveysTypes } = require('./../../constants');

const getParticipantSessions = async (req, res, next) => {
  const { PIN, email } = req.params;

  try {
    let sessions = [];
    if (PIN) {
      sessions = await participantSessionsQuery(PIN);
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
    }
    // for email
    sessions = await findSessionsIncludeParticipantEmail(email);
    return res.send(sessions);
  } catch (err) {
    return next(boom.badImplementation());
  }
};

module.exports = getParticipantSessions;
