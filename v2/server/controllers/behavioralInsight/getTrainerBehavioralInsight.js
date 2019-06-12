const boom = require('boom');
const getTrainerBehavioral = require('./../../database/queries/behavioralInsight/trainer');
const {
  getPINsRespondedToTrainerSessions,
} = require('../../database/queries/users/trainer');
const trainerBehavioralFormulae = require('./../../helpers/trainerBehavioral');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(boom.badRequest('no trainer id provided'));
  }
  const results = await getPINsRespondedToTrainerSessions(id);

  const PINs = results.reduce((prev, curr) => {
    prev.push(curr.PIN);
    return prev;
  }, []);

  return getTrainerBehavioral(PINs).then(result => {
    const calculatedFormulae = trainerBehavioralFormulae(result);
    res.json({ ...calculatedFormulae });
  });
};
