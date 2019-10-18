const boom = require('boom');
const {
  removeTrainerFromGroup: removeTrainerFromGroupQuery,
} = require('../../database/queries/users/localLead/index');

const removeTrainerFromGroup = async (req, res, next) => {
  const { localLeadId, trainerId } = req.params;

  try {
    await removeTrainerFromGroupQuery(localLeadId, trainerId);
    return res.send();
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = removeTrainerFromGroup;
