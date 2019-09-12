const boom = require('boom');
const {
  deleteAccount,
} = require('./../../database/queries/users/deleteAccountQuery');
const {
  deleteTrainerFromAllSessions,
} = require('./../../database/queries/users');

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
      await Promise.all([
        deleteAccount(_id, trainersGroup, 'localLead'),
        deleteTrainerFromAllSessions(_id),
      ]);
    } else {
      const { localLead } = req.user;
      await Promise.all([
        deleteAccount(_id, localLead, 'trainersGroup'),
        deleteTrainerFromAllSessions(_id),
      ]);
    }
    return res.send({ success: true });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
