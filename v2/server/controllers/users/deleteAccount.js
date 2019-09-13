const boom = require('boom');
const {
  deleteAccount,
} = require('./../../database/queries/users/deleteAccountQuery');

module.exports = async (req, res, next) => {
  const { role, _id, id } = req.user;
  const { userId } = req.params;
  if (userId !== id) {
    return next(boom.unauthorized());
  }

  if (!(role === 'trainer' || role === 'localLead')) {
    return next(boom.unauthorized());
  }

  try {
    if (role === 'localLead') {
      const { trainersGroup } = req.user;
      await deleteAccount(_id, trainersGroup, 'localLead');
    } else {
      const { localLead } = req.user;
      await deleteAccount(_id, localLead, 'trainersGroup');
    }
    return res.send({ success: true });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
