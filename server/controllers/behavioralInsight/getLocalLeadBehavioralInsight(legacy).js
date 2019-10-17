const boom = require('boom');
const getTrainerBehavioral = require('../../database/queries/behavioralInsight/trainer');
const {
  getPINsRespondedToGroupSessions,
} = require('../../database/queries/users/trainer');
const trainerBehavioralFormulae = require('../../helpers/trainerBehavioral');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(boom.badRequest('no local lead id provided'));
  }
  try {
    const results = await getPINsRespondedToGroupSessions(id);
    const PINs = results[0] && results[0].PIN;
    return getTrainerBehavioral(PINs)
      .then(result => {
        const calculatedFormulae = trainerBehavioralFormulae(result);
        res.json({ ...calculatedFormulae });
      })
      .catch(err => {
        return next(boom.badImplementation('error in getting the data'));
      });
  } catch (error) {
    return next(boom.badImplementation());
  }
};
