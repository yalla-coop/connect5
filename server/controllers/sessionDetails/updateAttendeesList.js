const boom = require('boom');

// import db queries
const {
  updateAttendeesList,
  getSessionById,
} = require('./../../database/queries/sessionDetails/session');

const {
  removeEmailBySurveyType,
  scheduleNewEmail,
} = require('./../../database/queries/sessionDetails/scheduleEmails');

// import helpers
const { getScheduleDates } = require('./../../helpers/get3and6MonthDates');

const { getThreeMonthSurvey, getSixMonthSurvey } = require('./../../helpers');

module.exports = (req, res, next) => {
  const { sessionId } = req.params;
  const { participantsEmails, status, isPartial } = req.body;

  updateAttendeesList({ sessionId, participantsEmails, status, isPartial })
    .then(async () => {
      // get session Details
      const sessionDetails = await getSessionById(sessionId);
      console.log(sessionDetails, '---------------------------');
      const { date, type } = sessionDetails;
      const sessionDate = date.toString();
      const confirmedEmails = participantsEmails.map(
        participant => participant.email
      );

      const ThreeMonthSurvey = getThreeMonthSurvey(type);

      const SixMonthSurvey = getSixMonthSurvey(type);

      // now the event has confirmed emails schedule 3 and 6 month surveys
      // remove existing emails
      await removeEmailBySurveyType({
        sessionId,
        surveyTypes: [ThreeMonthSurvey, SixMonthSurvey],
      });

      const sessionDetails2 = await getSessionById(sessionId);
      console.log(sessionDetails2, '++++++++++++++++++++++++++++');

      // await removeEmailBySurveyType({
      //   sessionId,
      //   surveyType: SixMonthSurvey,
      // });
      // add new ones
      await scheduleNewEmail({
        sessionId,
        surveyType: ThreeMonthSurvey,
        recipients: confirmedEmails,
        date: getScheduleDates(sessionDate, 3),
      });
      await scheduleNewEmail({
        sessionId,
        surveyType: SixMonthSurvey,
        recipients: confirmedEmails,
        date: getScheduleDates(sessionDate, 6),
      });

      const sessionDetails3 = await getSessionById(sessionId);
      console.log(sessionDetails3, '============================');

      return res.json({});
    })
    .catch(err => {
      console.log(err);
      next(boom.badImplementation());
    });
};
