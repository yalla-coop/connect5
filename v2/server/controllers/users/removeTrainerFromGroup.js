const boom = require('boom');
const {
  removeTrainerFromGroup: removeTrainerFromGroupQuery,
} = require('../../database/queries/users/localLead');

const removeTrainerFromGroup = async (req, res, next) => {
  const { role } = req.user;
  const { trainerId, localLeadId } = req.params;

  if (role === 'localLead') {
    try {
      await removeTrainerFromGroupQuery(localLeadId, trainerId);
      return res.send();
    } catch (err) {
      return next(boom.badImplementation(err));
    }
  } else {
    return next(boom.unauthorized());
  }
};

module.exports = removeTrainerFromGroup;
