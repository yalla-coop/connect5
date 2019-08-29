const boom = require('boom');
const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { email, status } = req.body;

  const data = {
    sessionId,
    attendeesList: [{ email, status: 'confirmed' }],
    status,
  };

  updateAttendeesList(data)
    .then(result => {
      return res.json({ success: true });
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
