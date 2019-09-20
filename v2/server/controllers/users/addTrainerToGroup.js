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
  const localLeadId = localLead && localLead.key;
  const localLeadName = localLead && localLead.label;

  const success = [];
  let success2;
  // setup errors
  const errors = [];
  let localLeadDuplicate;

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

      // OFFICIAL LOCAL LEAD HANDLING -> relevant only for new users
      // check if trainer exists and if managing user is not yet assigned to trainer
      if (localLeadId && trainer && trainer.managers.includes(localLeadId)) {
        localLeadDuplicate = `This trainer is already registered in ${localLeadName}'s group`;
        errors.push(localLeadDuplicate);
      }
      // if no duplicate error run functions
      if (!localLeadDuplicate) {
        // add trainer to group of official local lead
        await addTrainertoGroup(localLeadId, trainer._id).then(() => {
          success.push(
            `${trainer.name} has been added to ${localLeadName}'s trainers group (official local lead)`
          );
        });

        // add official local lead to group of managers
        await addManagerToTrainer(trainer._id, localLeadId).then(() => {
          success.push(
            `${localLeadName} has been added to ${trainer.name}'s managers group (official local lead)`
          );
        });
      }
      console.log('success1', success);
    }

    // ADDITIONAL MANAGER HANDLING -> can relate to new user or existing trainer
    if (trainer && managers.length > 0) {
      managers.map(async manager => {
        // check if any of the additional managers is already assigned to trainer
        if (trainer && trainer.managers.includes(manager.key)) {
          errors.push(
            `This trainer is already registered in ${manager.label}'s group`
          );
        }

        // console.log(
        //   '!localLeadDuplicate && errors.length === 0',
        //   !localLeadDuplicate && errors.length === 0
        // );
        // console.log(
        //   'localLeadDuplicate && errors.length === 1',
        //   localLeadDuplicate && errors.length === 1
        // );
        // run functions if no duplicate errors exist
        if (
          (!localLeadDuplicate && errors.length === 0) ||
          (localLeadDuplicate && errors.length === 1)
        ) {
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
          console.log('reached');
        }

        // return errors.length > 0 ? next(boom.conflict(errors)) : success;
        // console.log('success', success);
        // console.log('success', success);
        // console.log('errors', errors);
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
    console.log(success);
    return errors.length > 0 ? next(boom.conflict(errors)) : res.json(success);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
