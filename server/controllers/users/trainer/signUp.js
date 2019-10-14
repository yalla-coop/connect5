const boom = require('boom');
const jwt = require('jsonwebtoken');
const { tokenMaxAge } = require('./../../../constants');

const {
  createNewTrainer,
} = require('./../../../database/queries/users/trainer');

const {
  addTrainertoLocalLeadGroup,
} = require('./../../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
  const {
    name,
    email,
    password,
    localLead,
    region,
    organization,
    role,
    officialLocalLead,
  } = req.body;

  try {
    if (name && email && password && region) {
      return createNewTrainer({
        name,
        email,
        password,
        region,
        localLead,
        organization,
        role,
        officialLocalLead,
        managers: role === 'trainer' ? [localLead] : [],
      }).then(async trainer => {
        const trainerInfo = {
          id: trainer._id,
          name: trainer.name,
          role: trainer.role,
          organization: trainer.organization,
          region: trainer.region,
          email: trainer.email,
          localLead: trainer.localLead,
          officialLocalLead: trainer.officialLocalLead,
        };
        // create token for 25 day
        const token = jwt.sign({ id: trainer._id }, process.env.SECRET, {
          expiresIn: tokenMaxAge.string,
        });

        if (trainerInfo.role === 'trainer') {
          await addTrainertoLocalLeadGroup(localLead, trainer._id).catch(
            err => {
              next(boom.badImplementation(err));
            }
          );
        }

        res.cookie('token', token, {
          maxAge: tokenMaxAge.number,
          httpOnly: true,
        });
        return res.json(trainerInfo);
      });
    }
  } catch (error) {
    return next(boom.badRequest(error));
  }
};
