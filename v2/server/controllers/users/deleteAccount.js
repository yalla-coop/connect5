const boom = require('boom');
const {
  deleteAccount,
} = require('./../../database/queries/users/deleteAccountQuery');

const {
  removeTrainerFromGroup,
  removeLocalLeadFromUser,
} = require('./../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
  const { role, localLead } = req.user;
  const { userId } = req.params;

  if (role === 'trainer' || role === 'localLead') {
    try {
      await deleteAccount(userId);
      if (role === 'trainer' && localLead) {
        await removeTrainerFromGroup(localLead, userId);
      }
      if (role === 'localLead') {
        await removeLocalLeadFromUser(userId);
      }

      return res.send({ success: true });
    } catch (err) {
      return next(boom.badImplementation(err));
    }
  } else {
    return next(boom.unauthorized());
  }
};
