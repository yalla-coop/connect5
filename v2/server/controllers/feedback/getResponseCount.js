const boom = require('boom');
const { getResponseCount } = require('../../database/queries/feedback');

module.exports = (req, res, next) => {
  const { sessionId, type: surveyType } = req.body;
  console.log('sess', req.body);

  return getResponseCount(sessionId, surveyType)
    .then(result => {
      console.log('results', result);
      return res.json(result.length);
    })
    .catch(err => next(boom.badImplementation('feedback error')));
};
