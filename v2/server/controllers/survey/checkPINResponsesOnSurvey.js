const boom = require('boom');
const { PINResponsesOnSurvey } = require('../../database/queries/surveys');

// check for the PIN
// if PIN submited a survey with the same shortId and survey type
// return { exist: true }
module.exports = (req, res, next) => {
  const { surveyType, shortId, PIN } = req.params;

  PINResponsesOnSurvey({ PIN, surveyType })
    .then(response => {
      const exist = !!(response && response.session.shortId === shortId);

      res.json({ exist });
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
