const boom = require('boom');
const getSurveyBehavioralInsight = require('./../../database/queries/behavioralInsight/survey');
const { getSessionPINs } = require('./../../database/queries/sessions');
const surveyBehavioralFormulae = require('./../../helpers/surveyBehavioral');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(boom.badRequest('no session id provided'));
  }
  const results = await getSessionPINs(id);

  const PINs = results.reduce((prev, curr) => {
    prev.push(curr.PIN);
    return prev;
  }, []);

  getSurveyBehavioralInsight(PINs).then(result => {
    const calculatedFormulae = surveyBehavioralFormulae(result);
    res.json({ calculatedFormulae });
  });
};
