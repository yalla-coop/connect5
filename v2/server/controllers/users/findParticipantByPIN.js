const boom = require('boom');

const { findParticipantByPIN } = require('../../database/queries/user');

module.exports = async (req, res, next) => {
  const { PIN } = req.params;

  await findParticipantByPIN(PIN)
    .then(response => res.json(response.PIN))
    .catch(err => next(boom.badImplementation()));
};
