const boom = require('boom');
const fromParticipant = require('../../database/queries/feedback/fromParticipant');

module.exports = (req, res, next) => {
  const { PIN } = req.params;

  fromParticipant(PIN)
    .then(result => {
      res.json(result);
    })
    .catch(err => next(boom.badImplementation()));
};
