const boom = require('boom');

const { createNewTrainer } = require('./../../database/queries/users/trainer');

const {
  addTrainertoGroup,
} = require('./../../database/queries/users/localLead');

const { getUserByEmail } = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  const { name, email, newUser, localLead, region } = req.body;
  const { user } = req;

  if (user.role !== 'localLead') {
    return next(boom.unauthorized());
  }

  try {
    let trainer = await getUserByEmail(email);

    if (newUser && !trainer) {
      trainer = await createNewTrainer({
        name,
        email,
        password: '123456',
        region,
        localLead,
        role: 'localLead',
      });
    }

    if (!trainer) {
      return next(boom.notFound('This email is not used'));
    }

    await addTrainertoGroup(localLead, trainer._id);
    return res.json({
      success: `${trainer.name} has been added to your group`,
    });
  } catch (error) {
    return next(boom.badImplementation());
  }
};
