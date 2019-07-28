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
  } = req.body;

  const trainers = [];
  try {
    if (
      session &&
      startDate &&
      inviteesNumber &&
      region &&
      // partnerTrainer1 &&
      emails
    ) {
      if (partnerTrainer1.length > 0) {
        trainers.push(partnerTrainer1);
      }
      if (partnerTrainer2.length > 0) {
        trainers.push(partnerTrainer2);
      } else {
        trainers.push(user._id);
        trainersNames[user.name] = user.name;
      }

      const addedSession = await createNewsession({
        startDate,
        session,
        inviteesNumber,
        region,
        trainers,
        emails,
      });

      if (sendByEmail) {
        if (process.env.NODE_ENV === 'production') {
          // send invitation link to participant
          await sendEmailInvitation({
            name: user.name,
            participantsEmails: emails,
            sessionDate: startDate,
            type: session,
            trainerName: Object.keys(trainersNames)
              .map(name => `${name[0].toUpperCase()}${name.slice(1)}`)
              .join(' & '),
            region,
            startTime,
            endTime,
            shortId: addedSession.shortId,
          });
        }
      }
      return res.json(addedSession);
    }

    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = addSession;
