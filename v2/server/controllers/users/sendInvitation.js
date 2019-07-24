const boom = require('boom');
const moment = require('moment');
const {
  StoreSentEmailDataQuery,
} = require('./../../database/queries/users/sendInvitation');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const SendInvitation = async (req, res, next) => {
  const {
    _id,
    participantsEmails,
    sendingDate,
    date,
    type,
    trainerName,
    region,
    startTime,
    endTime,
  } = req.body;
  const { name } = req.user;

  try {
    if (
      _id &&
      name &&
      participantsEmails &&
      sendingDate &&
      date &&
      type &&
      trainerName &&
      region &&
      startTime &&
      endTime
    ) {
      const StoreSentEmailData = await StoreSentEmailDataQuery({
        _id,
        name,
        participantsEmails,
        sendingDate,
        date,
        type,
        trainerName,
        region,
      });
      const sessionDate = moment(date).format('DD/MM/YYYY');

      sendEmailInvitation({
        name,
        participantsEmails,
        sessionDate,
        type,
        trainerName,
        region,
        startTime,
        endTime,
      });

      return res.json(StoreSentEmailData);
    }
    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation());
  }
};

module.exports = SendInvitation;
