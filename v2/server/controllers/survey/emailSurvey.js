const boom = require('boom');

const sendSurvey = require('../../helpers/emails.js/sendSurvey');

module.exports = async (req, res, next) => {
  const { surveyURL, participantsList, survetType } = req.body;
  try {
    if (process.env.NODE_ENV === 'production') {
      // send the survey link to participants
      await sendSurvey({ surveyURL, participantsList, survetType });
    }
    res.json();
  } catch (error) {
    next(boom.badImplementation());
  }
};
