const boom = require('boom');

const sendSurvey = require('../../helpers/emails/sendSurvey');

module.exports = async (req, res, next) => {
  const {
    surveyURL,
    participantsList,
    surveyType,
    extraInformation,
  } = req.body;
  try {
    if (process.env.NODE_ENV === 'production') {
      // send the survey link to participants
      await sendSurvey({
        surveyURLs: [
          {
            surveyType,
            surveyURL,
            extraInformation,
          },
        ],
        participantsList: participantsList.map(item => item.email),
      });
    }
    res.json();
  } catch (error) {
    next(boom.badImplementation());
  }
};
