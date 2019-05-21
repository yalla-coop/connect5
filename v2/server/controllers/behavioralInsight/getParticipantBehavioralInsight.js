const boom = require('boom');
const getParticipantBehavioralInsight = require('./../../database/queries/behavioralInsight/participant');
const participantBehavioralFormulae = require('./../../helpers/participantBehavioral');

module.exports = (req, res, next) => {
  const { PIN } = req.params;
  if (!PIN) {
    return next(boom.badRequest('no PIN provided'));
  }

  return getParticipantBehavioralInsight(PIN)
    .then(results => {
      const calculatedValues = participantBehavioralFormulae(results);

      res.json({ ...calculatedValues });
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
