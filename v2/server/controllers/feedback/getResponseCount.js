const boom = require('boom');
const { getResponseCount } = require('../../database/queries/feedback');

module.exports = (req, res, next) => {
  const { sessionId } = req.body;

  return getResponseCount(sessionId)
    .then(result => res.json(result.length))
    .catch(err => next(boom.badImplementation('feedback error')));
};
