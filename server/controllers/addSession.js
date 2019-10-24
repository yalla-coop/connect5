const boom = require('boom');
const createNewsession = require('./../database/queries/addSession');
const { getUserById } = require('./../database/queries/user');

const addSession = async (req, res, next) => {
  const { user } = req;
  const {
    session,
    startDate,
    inviteesNumber,
    region,
    partnerTrainer1,
    partnerTrainer2,
    emails,
    trainersNames,
    startTime,
    endTime,
    postcode,
    addressLine1,
    addressLine2,
  } = req.body;
  const trainers = [];
  let managers = [];
  try {
    if (session && startDate && inviteesNumber && region) {
      if (partnerTrainer1 && partnerTrainer1.length > 0) {
        trainers.push(partnerTrainer1);
        const trainerInfo = await getUserById(partnerTrainer1);
        managers = [...managers, ...trainerInfo.managers];
      }
      if (partnerTrainer2 && partnerTrainer2.length > 0) {
        trainers.push(partnerTrainer2);
        const trainerInfo = await getUserById(partnerTrainer2);
        managers = [...managers, ...trainerInfo.managers];
      } else if (user.role === 'trainer') {
        trainers.push(user._id);
        trainersNames.push(user.name);
        managers = [...managers, ...user.managers];
      }

      const address = {
        addressLine1,
        addressLine2,
        postcode,
      };

      const addedSession = await createNewsession({
        startDate,
        session,
        inviteesNumber,
        region,
        trainers,
        emails,
        startTime,
        endTime,
        address,
        canAccessResults: managers,
      });

      return res.json(addedSession);
    }

    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = addSession;
