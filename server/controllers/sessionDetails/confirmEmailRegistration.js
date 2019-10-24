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

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { email, status } = req.body;

  const data = {
    sessionId,
    participantsEmails: [{ email, status: 'confirmed' }],
    status,
    isPartialList: true,
  };

  updateAttendeesList(data)
    .then(async result => {
      // now participant added, update 3month and 6 month surveys
      // get session Details
      const sessionDetails = await getSessionById(sessionId);
      const { date, type, participantsEmails } = sessionDetails;
      const sessionDate = date.toString();

      const confirmedEmails = participantsEmails
        .filter(participant => participant.status === 'confirmed')
        .map(participant => participant.email);

      const ThreeMonthSurvey = getThreeMonthSurvey(type);

      const SixMonthSurvey = getSixMonthSurvey(type);

      // remove existing emails
      await removeEmailBySurveyType({
        sessionId,
        surveyTypes: [ThreeMonthSurvey, SixMonthSurvey],
      });

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

      return res.json({ success: true, confirmedEmail: email });
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
