const boom = require('boom');
const {
  deleteLocalLeadAccount,
  deleteTrainerAccount,
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
    const { trainersGroup, managers } = req.user;
    if (role === 'localLead') {
      await Promise.all([
        deleteLocalLeadAccount(_id, trainersGroup),
        deleteTrainerFromAllSessions(_id),
      ]);
    } else {
      await Promise.all([
        deleteTrainerAccount(_id, managers),
        deleteTrainerFromAllSessions(_id),
      ]);
    }
    return res.send({ success: true });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
