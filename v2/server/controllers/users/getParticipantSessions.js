const boom = require('boom');

const participantSessionsQuery = require('../../database/queries/users/participantSessionQuery');
const { surveysTypesNoFollowUps: surveysTypes } = require('./../../constants');

const getParticipantSessions = async (req, res, next) => {
  const { id: pin } = req.params;
  
  try {
    const sessions = await participantSessionsQuery(pin);
    // return the completed sessions (must have the post and the -pre if session has pre survey-)
    const sessionsWithStatus = sessions.map(session => {
      
      const sessionType = session.sessions.type;
      // console.log('session type', sessionType)
      const completedSurveys = session.surveyType;
      //  console.log('completed surveys', completedSurveys)
      //  console.log('test', surveysTypes[sessionType])
      const completed = surveysTypes[sessionType].every(type =>
        completedSurveys.includes(type)
      );
      return { ...session, completed };
    });
    console.log(sessionsWithStatus)
    return res.send(sessionsWithStatus);
  } catch (err) {
    return next(boom.badImplementation());
  }
};

module.exports = getParticipantSessions;
