const boom = require('boom');
const moment = require('moment');
const {
  UpdateSentEmailsQuery,
} = require('./../../database/queries/users/sendInvitation');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const updateSentInvitationEmails = async (req, res, next) => {
  const {
    updatedEmails,
    sendByEmail,
    newEmails,
    date,
    type,
    region,
    _id,
    startTime,
    endTime,
    shortId,
    trainerName,
    sendingDate,
  } = req.body;
  const { name } = req.user;
  try {
    if (
      updatedEmails &&
      sendByEmail &&
      sessionDate &&
      type &&
      region &&
      _id &&
      startTime &&
      endTime &&
      shortId &&
      trainerName &&
      sendingDate
    ) {
      sendEmailInvitation({
        name,
        newEmails,
        sessionDate,
        type,
        trainerName,
        region,
        startTime,
        endTime,
        shortId,
      });
    }

    res.json();
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation());
  }
};

module.exports = updateSentInvitationEmails;
