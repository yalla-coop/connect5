const boom = require('boom');
const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { participantsEmails, status, isPartial } = req.body;

  updateAttendeesList({ sessionId, participantsEmails, status, isPartial })
    .then(() => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
