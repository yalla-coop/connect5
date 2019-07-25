const boom = require('boom');
const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { attendeesList, status } = req.body;

  updateAttendeesList({ sessionId, attendeesList, status })
    .then(() => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
