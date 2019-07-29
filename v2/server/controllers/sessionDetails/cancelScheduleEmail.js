const boom = require('boom');
const {
  removeScheduledEmail,
} = require('./../../database/queries/sessionDetails/scheduleEmails');

module.exports = async (req, res, next) => {
  const { sessionId, scheduledEmailId } = req.params;
  removeScheduledEmail({ sessionId, scheduledEmailId })
    .then(() => {
      res.json({});
    })
    .catch(err => {
      console.log(err);
      next(boom.badImplementation());
    });
};
