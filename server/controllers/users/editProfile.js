/* eslint-disable no-param-reassign */
const boom = require('boom');

const {
  addTrainertoGroup,
  removeTrainerFromGroup,
  getLocalLeadsNames,
} = require('./../../database/queries/users/localLead');

const {
  update,
  addManagerToTrainer,
} = require('./../../database/queries/users');

const sendLocalLeadEmail = require('../../helpers/emails/sendLocalLeadEmail');

const editProfile = async (req, res, next) => {
  const { user } = req;
  const { organization = user.organization } = req.body;
  let { localLead } = req.body;

  localLead = localLead || user.localLead;

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
      // get localLeads names for (old localLead and new localLead)
      const localLeads = await getLocalLeadsNames(user.localLead, localLead);

      const oldLocalLead = localLeads.filter(item => {
        return item._id.toString() === user.localLead.toString();
      });

      const newLocalLead = localLeads.filter(item => {
        return item._id.toString() === localLead.toString();
      });

      if (process.env.NODE_ENV === 'production') {
        await sendLocalLeadEmail(
          oldLocalLead[0].name,
          oldLocalLead[0].email,
          user.name,
          'old'
        );

        await sendLocalLeadEmail(
          newLocalLead[0].name,
          newLocalLead[0].email,
          user.name,
          'new'
        );
      }
    }

    data.localLead = localLead || user.localLead;
    await update(user._id, data);
    if (localLead) {
      await addManagerToTrainer(user._id, localLead);
    }
    return res.json({});
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = editProfile;
