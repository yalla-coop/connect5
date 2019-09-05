const boom = require('boom');
const shortid = require('shortid');

const { createNewTrainer } = require('./../../database/queries/users/trainer');
const sendNewTrainerLoginDetails = require('../../helpers/emails/emailNewTrainerLoginDetails');
const sendRegisteredTranierEmail = require('../../helpers/emails/sendRegisteredTranierEmail');

const {
  addTrainertoGroup,
  removeTrainerFromGroup,
} = require('./../../database/queries/users/localLead');

const { getUserByEmail, update } = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  const { name, email, newUser, localLead, region, localLeadName } = req.body;

  const { user } = req;
  // console.log(user);

  if (user.role !== 'localLead') {
    return next(boom.unauthorized());
  }

  try {
    let trainer = await getUserByEmail(email);
    // if (!trainer) {
    //   return next(boom.notFound('This email is not used'));
    // }
    if (trainer && trainer.localLead.toString() === localLead) {
      return next(
        boom.conflict(
          `This trainer is already registered in ${localLeadName} group`
        )
      );
    }

    const randomPassword = shortid.generate();

    if (newUser && !trainer) {
      trainer = await createNewTrainer({
        name,
        email,
        password: randomPassword,
        region,
        localLead,
        role: 'trainer',
        givenPermission: false,
      });
    }

    await removeTrainerFromGroup(localLead, trainer._id);
    await addTrainertoGroup(localLead, trainer._id);

    await update(trainer._id, { localLead, givenPermission: false });
    if (newUser) {
      // if (process.env.NODE_ENV === 'production') {
      await sendNewTrainerLoginDetails(
        name,
        email,
        randomPassword,
        localLeadName,
        user.region
      );
      // }
      return res.json({
        success: `${trainer.name} has been added to ${localLeadName}'s group and login details have been sent to his/her email`,
      });
    }

    // if (process.env.NODE_ENV === 'production') {
    await sendRegisteredTranierEmail(email, trainer.name, localLeadName);
    // }
    return res.json({
      success: `${trainer.name} has been added to ${localLeadName}'s group`,
    });
  } catch (error) {
    return next(boom.badImplementation());
  }
};
