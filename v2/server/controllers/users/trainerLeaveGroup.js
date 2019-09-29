const boom = require('boom');
const {
  trainerLeaveGroup: trainerLeaveGroupQuery,
} = require('../../database/queries/users/trainer/trainerLeaveGroup.js');

const removeTrainerFromGroup = async (req, res, next) => {
  const { role, _id: trainerId } = req.user;

  const { managerId: localLeadId } = req.params;

  if (role === 'trainer') {
    try {
      await trainerLeaveGroupQuery(localLeadId, trainerId);
      return res.send();
    } catch (err) {
      return next(boom.badImplementation(err));
    }
  } else {
    return next(boom.unauthorized());
  }
};

module.exports = removeTrainerFromGroup;
