const boom = require('boom');
const {
  removeTrainerFromGroup,
} = require('./../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
  const { trainerId } = req.body;
  const { role } = req.user;
  const { id } = req.params;

  if (role === 'localLead') {
    try {
      await removeTrainerFromGroup(id, trainerId);
      return res.send();
    } catch (err) {
      return next(boom.badImplementation(err));
    }
  } else {
    return next(boom.unauthorized());
  }
};
