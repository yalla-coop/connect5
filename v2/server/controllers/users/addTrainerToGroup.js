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
  const errors = [];
  const success = [];
  const localLeadId = localLead && localLead.key;
  const localLeadName = localLead && localLead.label;

  // check if user has management priveleges
  if (user.role !== 'localLead') {
    return next(boom.unauthorized());
  }

  try {
    // get trainer from incoming email
    let trainer = await getUserByEmail(email);

    // generate password to be sent to trainer
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

    // ADDITIONAL MANAGER HANDLING

    if (managers.length > 0) {
      managers.map(async (manager, i) => {
        // check if any of the additional managers is already assigned to trainer
        if (trainer && trainer.managers.includes(manager.key)) {
          errors.push(
            `This trainer is already registered in ${manager.label}'s group`
          );
        }

        // add to groups of additional managers
        await addTrainertoGroup(manager.key, trainer._id).then(() => {
          success.push(
            `${trainer.name} has been added to ${manager.label}'s trainers group`
          );
        });

        // add addtional managers to trainer's manager array
        await addManagerToTrainer(trainer._id, manager.key).then(() => {
          success.push(
            `${manager.label} has been added to ${trainer.name}'s managers group`
          );
        });
      });
    }

    // OFFICIAL LOCAL LEAD HANDLING
    // check if trainer exists and if managing user is not yet assigned to trainer
    if (localLead && trainer && trainer.managers.includes(localLeadId)) {
      errors.push(
        `This trainer is already registered in ${localLeadName}'s group`
      );
    }
    // add trainer to group of official local lead
    await addTrainertoGroup(localLeadId, trainer._id).then(() => {
      success.push(
        `${trainer.name} has been added to ${localLeadName}'s trainers group`
      );
    });

    // add official local lead to group of managers
    await addManagerToTrainer(trainer._id, localLeadId).then(() => {
      success.push(
        `${localLeadName} has been added to ${trainer.name}'s managers group`
      );
    });

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

    if (errors.length > 0) {
      return next(boom.conflict(errors));
    }
    return res.json(success);
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation(error));
  }
};
