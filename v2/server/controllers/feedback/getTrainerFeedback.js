const boom = require('boom');
const {
  trainerFeedback,
} = require('./../../database/queries/feedback/trainer');

module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(boom.badRequest('no ID provided'));
  }

  return trainerFeedback(id)
    .then(result => res.json(result))
    .catch(err => next(boom.badImplementation(err)));
};
