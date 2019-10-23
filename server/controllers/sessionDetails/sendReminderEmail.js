const boom = require('boom');
const {
  addSentEmail,
} = require('./../../database/queries/sessionDetails/session');
const sendSessionReminder = require('./../../helpers/emails/sendSessionReminder');
const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');
const sendSurveyLink = require('./../../helpers/emails/sendSurveyLink');
const { getPreSurveyLink, getPostSurveyLink } = require('./../../helpers/');
const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { type } = req.query;
  const emailData = req.body;

  const preSurveyLink = getPreSurveyLink(
    emailData.sessionType,
    emailData.shortId
  );
  const postSurveyLink = getPostSurveyLink(
    emailData.sessionType,
    emailData.shortId
  );

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

    // if (process.env.NODE_ENV === 'production') {
    promises.push(
      sendSessionReminder({ ...emailData, preSurveyLink, postSurveyLink })
    );
    // }
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
    // if (process.env.NODE_ENV === 'production') {
    promises.push(sendEmailInvitation(emailData));
    // }
  } else if (type === 'surveyLink') {
    if (preSurveyLink) {
      emailData.preSurveyLink = preSurveyLink;
    }
    if (postSurveyLink) {
      emailData.postSurveyLink = postSurveyLink;
    }

    promises = [addSentEmail(sentEmailData)];
    // if (process.env.NODE_ENV === 'production') {
    promises.push(sendSurveyLink(emailData));
    // }
  }

  return Promise.all(promises)
    .then(resss => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
