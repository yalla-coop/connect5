const boom = require('boom');
const getTrainerBehavioral = require('../../database/queries/behavioralInsight/trainer');

const { getAllPins } = require('../../database/queries/users');

const trainerBehavioralFormulae = require('../../helpers/trainerBehavioral');

module.exports = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return next(boom.forbidden());
  }
  try {
    const results = await getAllPins();

    const PINs = results.reduce((prev, curr) => {
      prev.push(curr.PIN);
      return prev;
    }, []);

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
