const boom = require('boom');
const moment = require('moment');

const sendEmailInvitation = require('./../../helpers/emails/sendEmailInvitation');

const {
  getSessionDetails,
  updateInviteesList,
  addSentEmail,
} = require('../../database/queries/sessionDetails/session');

const preSurveys = {
  1: 'pre-day-1',
  'special-2-days': 'pre-special',
  'train-trainers': 'pre-train-trainers',
};

const updateSentInvitationEmails = async (req, res, next) => {
  const { sessionId, newEmails, deletedEmails, sendByEmail } = req.body;
  const { name } = req.user;

  let newEmailsObj = newEmails.map(email => ({ email, status: 'new' }));
  try {
    const sessionDetails = await getSessionDetails({ id: sessionId });

    const {
      date,
      type,
      region,
      startTime,
      endTime,
      trainers,
      shortId,
      address,
    } = sessionDetails[0];

    const preSurvey = preSurveys[type];
    const sessionDate = moment(date).format('DD/MMMM/YYYY');

    let preServeyLink = null;

    if (preSurvey !== undefined) {
      preServeyLink = `${process.env.DOMAIN}/survey/${preSurvey}&${shortId}`;
    }

    const trainerName = trainers
      .map(trainer => {
        return trainer.name;
      })
      .join(' & ');

    if (sendByEmail) {
      await sendEmailInvitation({
        name,
        emails: newEmails,
        sessionDate,
        type,
        trainerName,
        region,
        startTime,
        endTime,
        shortId,
        address: address || 'TBC',
      });
      // update the email status to sent;
      newEmailsObj = newEmails.map(email => {
        return { email, status: 'sent' };
      });
      await addSentEmail({
        sessionId,
        emailData: {
          address,
          startTime,
          endTime,
          trainers: trainerName,
          shortId,
          sessionType: type,
          trainerName,
          recipients: newEmails,
        },
        type: 'registration',
        preServeyLink,
      });
    }
    // just update the db
    await updateInviteesList({
      sessionId,
      newEmailsObj,
      deletedEmails,
    });

    return res.json();
  } catch (err) {
    return next(boom.badImplementation());
  }
};

module.exports = updateSentInvitationEmails;
