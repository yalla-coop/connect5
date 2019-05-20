const boom = require('boom');
const getParticipantBehavioralInsight = require('./../../database/queries/behavioralInsight/participant');

module.exports = (req, res, next) => {
  const { PIN } = req.params;
  if (!PIN) {
    return next(boom.badRequest('no PIN provided'));
  }

  return getParticipantBehavioralInsight(PIN)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
