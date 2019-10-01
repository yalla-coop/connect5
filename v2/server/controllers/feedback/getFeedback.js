const boom = require('boom');
const feedbackFormulae = require('../../helpers/feedbackFormulae');
const filterFeedback = require('./../../database/queries/feedback/filterFeedback');

module.exports = async (req, res, next) => {
  const { filters = {} } = req.body;

  try {
    const { filterdResults, allResults } = await filterFeedback(filters);

    const feedback = feedbackFormulae(filterdResults, allResults);
    res.json({ feedback });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
