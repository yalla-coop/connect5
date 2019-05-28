const boom = require('boom');
const {
  deleteSession,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  deleteSession(id)
    .then(sessionDelete => {
      if (sessionDelete) {
        return res.json('session has been successfully deleted');
      }
      return next(boom.notFound('No session founded'));
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
