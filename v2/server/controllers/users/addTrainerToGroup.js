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
  const { name, email, newUser, localLead, managers, region } = req.body;
  const { user } = req;

  const localLeadId = localLead.key;
  const localLeadName = localLead.label;

  console.log(req.body);
  // check if user has management priveleges
  if (user.role !== 'localLead') {
    return next(boom.unauthorized());
  }

  try {
    let trainer = await getUserByEmail(email);

    // check if trainer exists and if manager user is not yet assigned to trainer
    if (trainer && trainer.managers.includes(localLeadId)) {
      return next(
        boom.conflict(
          `This trainer is already registered in ${localLeadName}'s group`
        )
      );
    }

    const randomPassword = shortid.generate();

    // check if trainer is new user and create account
    if (newUser && !trainer) {
      trainer = await createNewTrainer({
        name,
        email,
        password: randomPassword,
        region,
        localLead: localLeadId,
        role: 'trainer',
      });
    }

    // add trainer to group of official local lead
    await addTrainertoGroup(localLeadId, trainer._id);

    // add to groups of additional managers
    if (managers.length > 0) {
      await managers.map(async manager => {
        const addTrainer = await addTrainertoGroup(manager.key, trainer._id);

        return addTrainer;
      });
    }

    // add official local lead to group of managers of trainer
    await addManagerToTrainer(trainer._id, localLeadId);

    // add addtional managers to trainer's manager array
    if (managers.length > 0) {
      await managers.map(async manager => {
        const addManager = await addManagerToTrainer(trainer._id, manager.key);

        return addManager;
      });
    }

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
      localLead: localLeadId,
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
