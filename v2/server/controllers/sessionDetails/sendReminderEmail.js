const boom = require('boom');
const {
  addSentEmail,
} = require('./../../database/queries/sessionDetails/session');
const sendSessionReminder = require('./../../helpers/emails/sendSessionReminder');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { type } = req.query;
  const emailData = req.body;

  const surveyTypes = {
    1: ['pre-day-1', 'post-day-1'],
    2: ['post-day-2'],
    3: ['post-day-3'],
    'special-2-days': ['pre-special', 'post-special'],
    'train-trainers': ['pre-train-trainers', 'post-train-trainers'],
  };

  const links = surveyTypes[emailData.sessionType].map(item => {
    return `${process.env.DOMAIN}/survey/${item}&${emailData.shortId}`;
  });

  const preSurveyLink = links.find(item => item.includes('pre'));
  const postSurveyLink = links.find(item => item.includes('post'));

  const sentEmailData = {
    sessionId,
    emailData,
    type,
    preSurveyLink,
    postSurveyLink,
  };

  let promises = [];
  if (type === 'reminder') {
    promises = [addSentEmail(sentEmailData)];

    if (process.env.NODE_ENV === 'production') {
      promises.push(
        sendSessionReminder({ ...emailData, preSurveyLink, postSurveyLink })
      );
    }
  } else if (type === 'registration') {
    const data = {
      sessionId,
      participantsEmails:
        emailData.recipients &&
        emailData.recipients.map(item => ({ email: item, status: 'sent' })),
      status: 'sent',
      isPartialList: true,
    };

    promises = [addSentEmail(sentEmailData), updateAttendeesList(data)];
    if (process.env.NODE_ENV === 'production') {
      promises.push(sendEmailInvitation(emailData));
    }
  }

  return Promise.all(promises)
    .then(() => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
