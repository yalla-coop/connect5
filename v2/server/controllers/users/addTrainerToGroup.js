const boom = require('boom');
const shortid = require('shortid');

const { createNewTrainer } = require('./../../database/queries/users/trainer');
// const sendNewTrainerLoginDetails = require('../../helpers/emails/emailNewTrainerLoginDetails');
// const sendRegisteredTranierEmail = require('../../helpers/emails/sendRegisteredTranierEmail');
const addNewTrainerToGroup = require('../../helpers/emails/addNewTrainerToGroup');

const {
  addTrainertoGroup,
} = require('./../../database/queries/users/localLead');

const {
  getUserByEmail,
  addManagerToTrainer,
} = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  const { name, email, newUser, localLead, region, localLeadName } = req.body;
  const { user } = req;

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
        localLead: [localLead],
        role: 'trainer',
      });
    }

    // await removeTrainerFromGroup(localLead, trainer._id);
    await addTrainertoGroup(localLead, trainer._id);

    await addManagerToTrainer(trainer._id, localLead);
    let isNew = false;
    if (newUser) {
      isNew = true;
    }

    const emailInfo = {
      trainerName: trainer.name,
      trainerEmail: email,
      password: randomPassword,
      localLeadName,
      localLeadRegion: user.region,
      isNew,
      localLeadId: localLead,
      trainerId: trainer._id,
    };

    if (process.env.NODE_ENV === 'production') {
      await addNewTrainerToGroup(emailInfo);
    }
    return res.json({
      success: `${trainer.name} has been added to ${localLeadName}'s group`,
    });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
