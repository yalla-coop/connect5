const boom = require('boom');
const {
  StoreSentEmailDataQuery,
} = require('./../../database/queries/users/sendInvitation');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const addSession = async (req, res, next) => {
  const {
    _id,
    participantsEmails,
    sendingDate,
    date,
    type,
    trainerName,
    region,
  } = req.body;
  const { name } = req.user;

  console.log(
    _id,
    participantsEmails,
    sendingDate,
    date,
    type,
    trainerName,
    region
  );
  try {
    if (
      _id &&
      name &&
      participantsEmails &&
      sendingDate &&
      date &&
      type &&
      trainerName &&
      region
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
      const recipients = participantsEmails.toString();
      console.log(recipients, 'eeeeeeeeeeee');
      // sendEmailInvitation({
      //   name,
      //   recipients,
      //   sendingDate,
      //   date,
      //   type,
      //   trainerName,
      //   region,
      // });
      return res.json(StoreSentEmailData);
    }
    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation());
  }
};

module.exports = addSession;
