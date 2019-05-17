// controller to send the answers to the database
const boom = require('boom');

const storeResponse = require('../../database/queries/surveys/storeResponse');
const storeAnswers = require('../../database/queries/surveys/storeAnswers');
// const validateSurveyInput = require('../validation/survey-answers-val');

module.exports = (req, res, next) => {
  const { PIN, sessionId, surveyType, formState } = req.body;

  // storeResponse adds the response to the Response model
  // and returns the unique Response ID
  // storeAnswers adds all answers to the Answer model
  storeResponse(PIN, sessionId, surveyType)
    .then(response => storeAnswers(response._id, formState, sessionId))
    .then(result => res.status(200).json(result))
    .catch(err => next(boom.badImplementation()));
};
