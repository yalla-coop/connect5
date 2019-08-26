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
  const { name, email, password, localLead, region, role } = req.body;
  console.log(role, 'rollllllllllle');
  if (name && email && password && region) {
    return createNewTrainer({
      name,
      email,
      password,
      region,
      localLead,
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
        console.log(err);
        next(boom.badImplementation());
      });
  }
  return next(boom.badRequest('Some arguments are missed'));
};
