const boom = require('boom');

const filtereData = require('./../../database/queries/behavioralInsight/filtereData');
const behavioralCalculator = require('../../helpers/formulaeTrainers');

module.exports = async (req, res, next) => {
  const { filters = {} } = req.body;
  try {
    const [filteredBehavioralInsight, allAnswers] = await Promise.all([
      filtereData(filters),
      filtereData({}),
    ]);

    const results = behavioralCalculator(filteredBehavioralInsight, allAnswers);
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
