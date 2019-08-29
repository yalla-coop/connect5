const boom = require('boom');
const jwt = require('jsonwebtoken');
const { tokenMaxAge } = require('./../../../constants');

const {
  createNewTrainer,
} = require('./../../../database/queries/users/trainer');

const {
  addTrainertoGroup,
} = require('./../../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
<<<<<<< HEAD
  const { name, email, password, localLead, region, role } = req.body;
=======
  const {
    name,
    email,
    password,
    localLead,
    region,
    organization,
    role,
  } = req.body;
>>>>>>> 481e8033a067cdf855ef3b70fe1aa5afbd2d77fe
  if (name && email && password && region) {
    return createNewTrainer({
      name,
      email,
      password,
      region,
      localLead,
<<<<<<< HEAD
      givenPermission: true,
=======
      organization,
>>>>>>> 481e8033a067cdf855ef3b70fe1aa5afbd2d77fe
      role,
    })
      .then(trainer => {
        const trainerInfo = {
          id: trainer._id,
          name: trainer.name,
          role: trainer.role,
          organization: trainer.organization,
          region: trainer.region,
          email: trainer.email,
          localLead: trainer.localLead,
        };
        addTrainertoGroup(localLead, trainer._id)
          .then(result => {
            // create token for 25 day
            const token = jwt.sign({ id: trainer._id }, process.env.SECRET, {
              expiresIn: tokenMaxAge.string,
            });

            res.cookie('token', token, {
              maxAge: tokenMaxAge.number,
              httpOnly: true,
            });
            return res.json(trainerInfo);
          })
          .catch(err => {
            next(boom.badImplementation());
          });
      })
      .catch(err => {
        next(boom.badImplementation());
      });
  }
  return next(boom.badRequest('Some arguments are missed'));
};
