const boom = require('boom');
const moment = require('moment');
const {
  StoreSentEmailDataQuery,
} = require('./../../database/queries/users/sendInvitation');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

const SendInvitation = async (req, res, next) => {
  const {
    _id,
    recipients,
    sendDate,
    sessionDate,
    sessionType,
    trainers,
    startTime,
    endTime,
    shortId,
    address,
    extraInformation,
    confirmedEmails,
  } = req.body;
  const { name } = req.user;

  try {
    if (
      _id &&
      name &&
      recipients &&
      sendDate &&
      sendDate &&
      sessionType &&
      trainers &&
      recipients.length > 0
    ) {
      const StoreSentEmailData = await StoreSentEmailDataQuery({
        _id,
        trainer: name,
        recipients,
        sendDate,
        sessionDate,
        sessionType,
        trainers,
        startTime: startTime || 'N/A',
        endTime: endTime || 'N/A',
        address,
        extraInformation,
        confirmedEmails,
      });

      if (process.env.NODE_ENV === 'production') {
        await sendEmailInvitation({
          trainer: name,
          recipients,
          sessionDate:
            sessionDate && moment(sessionDate).format('DD/MMMM/YYYY'),
          sessionType,
          trainers,
          address: address || 'TBC',
          startTime,
          endTime,
          shortId,
          extraInformation,
        });
      }

      const data = {
        sessionId: _id,
        attendeesList: recipients,
        status: 'sent',
        isPartialList: true,
      };

      await updateAttendeesList(data);

      return res.json(StoreSentEmailData);
    }
    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = SendInvitation;
