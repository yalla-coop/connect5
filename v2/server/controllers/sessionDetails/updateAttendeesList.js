const boom = require('boom');
const {
  updateAttendeesList,
  getSessionById,
} = require('./../../database/queries/sessionDetails/session');

const {
  removeEmailBySurveyType,
  scheduleNewEmail,
} = require('./../../database/queries/sessionDetails/scheduleEmails');

module.exports = (req, res, next) => {
  const { sessionId } = req.params;
  const { participantsEmails, status, isPartial } = req.body;

  updateAttendeesList({ sessionId, participantsEmails, status, isPartial })
    .then(async () => {
      // get session Details
      const sessionDetails = await getSessionById(sessionId);

      // now the event has confirmed emails schedule 3 and 6 month surveys
      // remove existing emails
      await removeEmailBySurveyType({
        sessionId,
        surveyType: 'follow-up-3-month',
      });
      await removeEmailBySurveyType({
        sessionId,
        surveyTypr: 'follow-up-6-month',
      });
      // add new ones
      await scheduleNewEmail({
        sessionId,
        surveyType: 'follow-up-3-month',
        recipients: participantsEmails,
        date: '01/01/2019',
      });

      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
