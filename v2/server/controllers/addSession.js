const boom = require('boom');
const createNewsession = require('./../database/queries/addSession');

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
  try {
    if (session && startDate && inviteesNumber && region) {
      if (partnerTrainer1 && partnerTrainer1.length > 0) {
        trainers.push(partnerTrainer1);
      }
      if (partnerTrainer2 && partnerTrainer2.length > 0) {
        trainers.push(partnerTrainer2);
      } else {
        trainers.push(user._id);
        trainersNames.push(user.name);
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
      });

      return res.json(addedSession);
    }

    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = addSession;
