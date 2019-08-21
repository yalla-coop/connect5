/* eslint-disable no-param-reassign */
const boom = require('boom');

const {
  addTrainertoGroup,
  removeTrainerFromGroup,
} = require('./../../database/queries/users/localLead');
const { update } = require('./../../database/queries/users');

const editProfile = async (req, res, next) => {
  const { user } = req;
  const {
    organization = user.organization,
    localLead = user.localLead,
  } = req.body;

  try {
    await update(user._id, { localLead, organization });

    if (localLead !== user.localLead) {
      // remove from the old local lead group
      await removeTrainerFromGroup(user.localLead, user._id);
      // add trainer to the new local lead group
      await addTrainertoGroup(localLead, user._id);
    }
    return res.json({});
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = editProfile;
