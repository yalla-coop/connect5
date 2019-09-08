const boom = require('boom');
const shortid = require('shortid');

const { createNewTrainer } = require('./../../database/queries/users/trainer');
const sendNewTrainerLoginDetails = require('../../helpers/emails/emailNewTrainerLoginDetails');

const {
  addTrainertoGroup,
} = require('./../../database/queries/users/localLead');

const { getUserByEmail, update } = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  const { name, email, newUser, localLead, region, localLeadName } = req.body;

  console.log('req.body', req.body, localLead);

  const { user } = req;
  if (user.role !== 'localLead') {
    return next(boom.unauthorized());
  }

  try {
    let trainer = await getUserByEmail(email);
    console.log('trainer', trainer);
    const randomPassword = shortid.generate();

    if (newUser && !trainer) {
      trainer = await createNewTrainer({
        name,
        email,
        password: randomPassword,
        region,
        localLead: [localLead],
        role: 'trainer',
      });
    }

    // if (!trainer) {
    //   return next(boom.notFound('This email is not used'));
    // }

    console.log('trainer', trainer);

    await addTrainertoGroup(localLead, trainer._id);

    await update(trainer._id, { localLead: [] });

    if (process.env.NODE_ENV === 'production') {
      await sendNewTrainerLoginDetails(
        name,
        email,
        randomPassword,
        localLeadName,
        user.region
      );
    }
    return res.json({
      success: `${trainer.name} has been added to ${localLeadName}'s group and login details have been sent to his/her email`,
    });
  } catch (error) {
    return next(boom.badImplementation());
  }
};
