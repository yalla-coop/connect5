const boom = require('boom');
const moment = require('moment');
const {
  StoreSentEmailDataQuery,
} = require('./../../database/queries/users/sendInvitation');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const SendInvitation = async (req, res, next) => {
  const {
    _id,
    emails,
    sendingDate,
    date,
    type,
    trainerName,
    region,
    startTime,
    endTime,
    shortId,
    address,
    confirmedEmails,
  } = req.body;

  const { name } = req.user;

  try {
    if (
      _id &&
      name &&
      emails &&
      sendingDate &&
      date &&
      type &&
      trainerName &&
      region
    ) {
      const StoreSentEmailData = await StoreSentEmailDataQuery({
        _id,
        name,
        emails,
        sendingDate,
        date,
        type,
        trainerName,
        startTime: startTime || 'N/A',
        endTime: endTime || 'N/A',
        address,
        confirmedEmails,
      });
      const sessionDate = moment(date).format('DD/MMMM/YYYY');

      if (process.env.NODE_ENV === 'production') {
        sendEmailInvitation({
          name,
          emails,
          sessionDate,
          type,
          trainerName,
          address,
          region,
          startTime,
          endTime,
          shortId,
        });
      }
      return res.json(StoreSentEmailData);
    }
    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = SendInvitation;
