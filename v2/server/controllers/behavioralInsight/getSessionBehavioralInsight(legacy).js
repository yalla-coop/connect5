const boom = require('boom');
const getSurveyBehavioralInsight = require('./../../database/queries/behavioralInsight/survey');
const { getSurveyPINs } = require('../../database/queries/surveys');
const surveyBehavioralFormulae = require('./../../helpers/surveyBehavioral');

module.exports = async (req, res, next) => {
  const { sessionId, surveyType } = req.params;
  if (!sessionId || !surveyType) {
    return next(boom.badRequest('no session id provided'));
  }
  try {
    const results = await getSurveyPINs(sessionId, surveyType);

    const PINs = results.reduce((prev, curr) => {
      prev.push(curr.PIN);
      return prev;
    }, []);

    return getSurveyBehavioralInsight(PINs)
      .then(result => {
        const calculatedFormulae = surveyBehavioralFormulae(result);
        res.json({ ...calculatedFormulae });
      })
      .catch(() => {
        return next(boom.badImplementation('error in getting the data'));
      });
  } catch (error) {
    return next(boom.badImplementation());
  }
};
