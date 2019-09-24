const boom = require('boom');
const shortid = require('shortid');

const { createNewTrainer } = require('./../../database/queries/users/trainer');
const addNewTrainerToGroup = require('../../helpers/emails/addNewTrainerToGroup');

const {
  addTrainerToGroups,
  addManagersToTrainer,
} = require('./../../database/queries/users/localLead');

const { getUserByEmail } = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  const { name, email, newUser, localLead, managers, region } = req.body;
  const { user } = req;
  const localLeadId = localLead && localLead.key;
  const managerNames = managers && managers.map(e => e.label);
  const errors = [];

  // check if user has management priveleges
  if (user.role !== 'localLead') {
    return next(boom.unauthorized());
  }
  try {
    // check if trainer already exists
    let trainer = await getUserByEmail(email);
    // generate password to be sent to new trainer
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

    // Groups handling
    if (trainer && managers.length > 0) {
      // check for duplicates
      managers.map(el => {
        if (trainer.managers.includes(el.key.toString())) {
          errors.push(el.label);
        }
      });

      // run functions
      await Promise.all([
        addTrainerToGroups(managers, trainer._id),
        addManagersToTrainer(managers, trainer._id),
      ]);
    }

    let isNew = false;
    if (newUser) {
      isNew = true;
    }

    const emailInfo = {
      trainerName: trainer.name,
      trainerEmail: email,
      password: randomPassword,
      managers: managerNames,
      isNew,
      localLead: localLeadId,
      trainerId: trainer._id,
    };

    if (process.env.NODE_ENV === 'production') {
      await addNewTrainerToGroup(emailInfo);
    }

    return res.json({ managers: managerNames, errors });
  } catch (error) {
    next(boom.badRequest(error));
  }
};
