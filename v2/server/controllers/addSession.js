const boom = require('boom');
const createNewsession = require('./../database/queries/addSession');
const sendEmailInvitation = require('../helpers/emails/sendEmailInvitation');

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
    sendByEmail,
    trainersNames,
    startTime,
    endTime,
    location,
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
        location,
        addressLine1,
        addressLine2,
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

      if (sendByEmail) {
        if (process.env.NODE_ENV === 'production') {
          // send invitation link to participant

          const string =
            trainersNames &&
            trainersNames
              .filter(item => !!item)
              .map(name => `${name[0].toUpperCase()}${name.slice(1)}`)
              .join(' & ');

          await sendEmailInvitation({
            name: user.name,
            emails,
            sessionDate: startDate,
            type: session,
            trainerName: string || 'N/A',
            region,
            startTime,
            endTime,
            shortId: addedSession.shortId,
            address: address || 'N/A',
          });
        }
      }

      return res.json(addedSession);
    }

    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation());
  }
};

module.exports = addSession;
