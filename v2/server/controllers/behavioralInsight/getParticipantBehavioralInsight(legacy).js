const boom = require('boom');
const getParticipantBehavioralInsight = require('./../../database/queries/behavioralInsight/participant');
const getAllBehavioralInsight = require('./../../database/queries/behavioralInsight/allAnswers');
const behavioralCalculator = require('../../helpers/formulaeParticipants');

module.exports = async (req, res, next) => {
  try {
    const { PIN } = req.params;
    if (!PIN) {
      return next(boom.badRequest('no PIN provided'));
    }

    const [userAnswers, allAnswers] = await Promise.all([
      getParticipantBehavioralInsight(PIN),
      getAllBehavioralInsight(),
    ]);

    const results = behavioralCalculator(userAnswers, allAnswers);
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
