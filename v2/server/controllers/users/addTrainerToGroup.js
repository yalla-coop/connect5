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
      managers.map(manager => {
        // check if any of the additional managers is already assigned to trainer
        if (trainer && trainer.managers.includes(manager.key)) {
          next(
            boom.badImplementation(
              `This trainer is already registered in ${manager.label}'s group`
            )
          );
        }
      });

      return Promise.all([
        addTrainerToGroups(managers, trainer._id),
        addManagersToTrainer(managers, trainer._id),
      ]).then(result =>
        res.status(200).json(managers.map(({ label }) => label))
      );
    }

    // let isNew = false;
    // if (newUser) {
    //   isNew = true;
    // }

    // const emailInfo = {
    //   trainerName: trainer.name,
    //   trainerEmail: email,
    //   password: randomPassword,
    //   localLeadName,
    //   localLeadRegion: user.region,
    //   isNew,
    //   localLead: localLeadId,
    //   trainerId: trainer._id,
    // };

    // if (process.env.NODE_ENV === 'production') {
    //   await addNewTrainerToGroup(emailInfo);
    // }
  } catch (error) {
    console.log('err', error);
    next(boom.badRequest(error));
  }
};
