const boom = require('boom');

const {
  getAllResponsesOnSurvey,
} = require('../../database/queries/surveys/surveyResponses');

module.exports = async (req, res, next) => {
  const { sessionId, surveyType } = req.params;

  return getAllResponsesOnSurvey(sessionId, surveyType)
    .then(responses => {
      res.json({ responses });
    })
    .catch(err => next(boom.badImplementation()));
};
