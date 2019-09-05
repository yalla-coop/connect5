const boom = require('boom');
const {
  addSentEmail,
} = require('./../../database/queries/sessionDetails/session');
const sendSessionReminder = require('./../../helpers/emails/sendSessionReminder');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

const preSurveys = {
  1: 'pre-day-1',
  'special-2-days': 'pre-special',
  'train-trainers': 'pre-train-trainers',
};

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { type } = req.query;
  const emailData = req.body;

  const preSurvey = preSurveys[emailData.sessionType];

  let preServeyLink = null;

  if (preSurvey !== undefined) {
    preServeyLink = `${process.env.DOMAIN}/survey/${preSurvey}&${emailData.shortId}`;
  }

  const sentEmailData = {
    sessionId,
    emailData,
    type,
    preServeyLink,
  };
  let promises = [];
  if (type === 'reminder') {
    promises = [
      addSentEmail(sentEmailData),
      sendSessionReminder({ ...emailData, preServeyLink }),
    ];
  } else if (type === 'registration') {
    const data = {
      sessionId,
      participantsEmails:
        emailData.recipients &&
        emailData.recipients.map(item => ({ email: item, status: 'sent' })),
      status: 'sent',
      isPartialList: true,
    };

    promises = [
      addSentEmail(sentEmailData),
      sendEmailInvitation({ ...emailData, preServeyLink }),
      updateAttendeesList(data),
    ];
  }

  return Promise.all(promises)
    .then(() => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
