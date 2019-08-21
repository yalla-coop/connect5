const boom = require('boom');
const {
  deleteAccount,
} = require('./../../database/queries/users/deleteAccountQuery');

module.exports = async (req, res, next) => {
  const { role } = req.user;
  const { userId } = req.params;

  if (role === 'trainer' || role === 'localLead') {
    try {
      await deleteAccount(userId);
      return res.send({ success: true });
    } catch (err) {
      return next(boom.badImplementation(err));
    }
  } else {
    return next(boom.unauthorized());
  }
};
