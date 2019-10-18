const boom = require('boom');
const {
  scheduleNewEmail,
} = require('./../../database/queries/sessionDetails/scheduleEmails');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { name } = req.user;
  const { surveyType, date, extraInformation, recipients } = req.body;
  scheduleNewEmail({
    sessionId,
    surveyType,
    date,
    extraInformation,
    recipients, // array of plain emails,
    trainer: name,
  })
    .then(() => {
      res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
