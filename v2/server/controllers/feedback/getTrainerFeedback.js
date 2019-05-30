// currently uses params as inputs (trainerId and sessionId) from url
// if only trainerId provided => overall feedback,
// if trainer and session id => individual session feedback

const boom = require('boom');
const {
  trainerFeedback,
} = require('./../../database/queries/feedback/trainer');

module.exports = (req, res, next) => {
  const { trainerId, sessionId } = req.params;

  if (!trainerId) {
    return next(boom.badRequest('no ID provided'));
  }

  return trainerFeedback(trainerId, sessionId)
    .then(result => res.json(result))
    .catch(err => next(boom.badImplementation('trainer feedback error')));
};
