const boom = require('boom');
const { getResponseCount } = require('../../database/queries/feedback');

module.exports = (req, res, next) => {
  const { sessionId, surveyType } = req.body;

  return getResponseCount(sessionId, surveyType)
    .then(result => res.json(result.length))
    .catch(err => next(boom.badImplementation('feedback error')));
};
