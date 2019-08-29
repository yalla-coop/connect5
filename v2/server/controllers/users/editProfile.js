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
  const data = {};
  if (organization) {
    data.organization = organization;
  }
  if (localLead) {
    data.localLead = localLead;
  }
  try {
    if (localLead !== user.localLead) {
      // remove from the old local lead group
      await removeTrainerFromGroup(user.localLead, user._id);
      // add trainer to the new local lead group
      await addTrainertoGroup(localLead, user._id);
    }

    data.localLead = localLead || user.localLead;
    await update(user._id, data);
    return res.json({});
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = editProfile;
