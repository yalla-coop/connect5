const boom = require('boom');
const {
  scheduleNewEmail,
} = require('./../../database/queries/sessionDetails/scheduleEmails');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { surveyType, date } = req.body;
  scheduleNewEmail({ sessionId, surveyType, date })
    .then(() => {
      res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
