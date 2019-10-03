const boom = require('boom');

const filtereData = require('./../../database/queries/behavioralInsight/filtereData');
const behavioralCalculator = require('../../helpers/formulaeTrainers');

module.exports = async (req, res, next) => {
  const { filters = {} } = req.body;
  try {
    const { filteredResults, allResults } = await filtereData(filters);

    const results = behavioralCalculator(filteredResults, allResults);
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
