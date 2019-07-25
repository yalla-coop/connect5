const Response = require('../../models/Response');
const Session = require('../../models/Session');
const Answer = require('../../models/Answer');

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
  const session = await Session.find({ _id: sessionID });
  const { type } = session[0];
  const relevantPreSurveys = ['pre-day-1', 'pre-train-trainers', 'pre-special'];

  // check if session includes pre-survey
  if (type === '1' || type === 'special-2-days' || type === 'train-trainers') {
    const response = await Response.find({
      PIN,
      session: sessionID,
    });

    let preResponseExists;

    if (
      response.length > 0 &&
      relevantPreSurveys.includes(response[0].surveyType)
    ) {
      preResponseExists = true;
    } else {
      preResponseExists = false;
    }
    return { preResponseExists, response };
  }
  // if no pre-survey included return true
  return 'no pre-survey included in session';
};
