const boom = require('boom');

const { findParticipantByPIN } = require('../../database/queries/user');

const { PINfilledPreSurvey } = require('../../database/queries/surveys');

module.exports = async (req, res, next) => {
  const { PIN } = req.params;
  const { sessionId } = req.body;

  Promise.all([findParticipantByPIN(PIN), PINfilledPreSurvey(PIN, sessionId)])
    .then(response => {
      res.json(response);
    })
    .catch(err => next(boom.badImplementation()));
};
