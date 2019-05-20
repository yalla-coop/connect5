// controller to send the answers to the database
const boom = require('boom');
const validateSurveyInput = require('../../middlewares/validateSurveyInput');

const storeResponse = require('../../database/queries/surveys/storeResponse');
const storeAnswers = require('../../database/queries/surveys/storeAnswers');

module.exports = async (req, res, next) => {
  const { errors, isValid } = await validateSurveyInput(req.body);

  const { PIN, sessionId, surveyType, formState } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // storeResponse adds the response to the Response model
  // and returns the unique Response ID
  // storeAnswers adds all answers to the Answer model
  storeResponse(PIN, sessionId, surveyType)
    .then(response => storeAnswers(response._id, formState, sessionId, PIN))
    .then(result => res.status(200).json(result))
    .catch(err => next(boom.badImplementation()));
};
