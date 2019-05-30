const boom = require('boom');
const {
  trainerFeedback,
} = require('./../../database/queries/feedback/trainer');

module.exports = (req, res, next) => {
  const { trainerId, sessionId } = req.params;
  // const sessionId = '5cee4930c0f049330c56c784';
  if (!trainerId) {
    return next(boom.badRequest('no ID provided'));
  }

  return trainerFeedback(trainerId, sessionId)
    .then(result => res.json(result))
    .catch(err => next(boom.badImplementation(err)));
};
