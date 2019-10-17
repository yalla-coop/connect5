const boom = require('boom');
const {
  createSpecialRequirement,
} = require('../database/queries/specialRequirements');

module.exports = (req, res, next) => {
  const { message, email } = req.body;
  const { sessionId } = req.params;
  return createSpecialRequirement({ message, email, sessionId })
    .then(result => res.json(result))
    .catch(err => next(boom.badImplementation(err)));
};
