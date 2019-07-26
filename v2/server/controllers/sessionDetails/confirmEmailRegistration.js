const boom = require('boom');
const {
  updateEmailStatus,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { email, status } = req.body;
  updateEmailStatus({ sessionId, email, status })
    .then(result => {
      // email is not in the list
      if (result.n === 0) {
        return next(boom.notFound('Your Email is not in the list'));
      }
      // email found but not updated
      if (result.n === 1 && result.nModified === 0) {
        return next(boom.conflict('Your Email already confirmed'));
      }
      return res.json({ success: true });
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
