const Response = require('../../models/Response');
const Session = require('../../models/Session');
const Answer = require('../../models/Answer');

const { surveysTypes } = require('./../../../constants');

module.exports.getSurveyPINs = (sessionId, surveyType) =>
  Response.find({ session: sessionId, surveyType }, { PIN: 1, _id: 0 });

module.exports.getAttendeesNumber = (sessionId, surveyType) => {
  return Session.findById(sessionId, { numberOfAttendees: 1 });
};

module.exports.storeAnswers = answers => Answer.create(answers);

module.exports.PINResponsesOnSurvey = ({ PIN, surveyType }) =>
  Response.findOne({ PIN, surveyType }).populate('session');

module.exports.PINfilledPreSurvey = async (PIN, sessionID) => {
  // get session info
  const session = await Session.findById(sessionID);
  const { sessionType } = session;

  // sessions that have -pre- survey
  const sessionsHavePreSurvey = Object.entries(surveysTypes).reduce(
    (prev, [_sessionType, surveysArray]) => {
      let hasPreSurvey = false;
      surveysArray.forEach(survey => {
        if (survey.includes('pre')) {
          hasPreSurvey = true;
        }
      });

      if (hasPreSurvey) {
        return [_sessionType, ...prev];
      }
      return prev;
    }
  );

  // check if session includes pre-survey
  if (sessionsHavePreSurvey.includes(sessionType)) {
    const response = await Response.findOne({
      PIN,
      session: sessionID,
    });

    let preResponseExists;

    if (response && response.surveyType.includes('pre')) {
      preResponseExists = true;
    } else {
      preResponseExists = false;
    }
    return { preResponseExists };
  }
  // if no pre-survey included return true
  return 'no pre-survey included in session';
};
