const boom = require('boom');
const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { attendeesList, status, isPartialList } = req.body;

  const data = {
    sessionId,
    attendeesList,
    status,
    isPartialList,
  };

  updateAttendeesList(data)
    .then(result => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
