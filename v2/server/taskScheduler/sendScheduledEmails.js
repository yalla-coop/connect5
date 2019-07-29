const cron = require('node-cron');

const sendSurvey = require('./../helpers/emails/sendSurvey');

const {
  getScheduledEmails,
} = require('./../database/queries/sessionDetails/scheduleEmails');

const sendScheduledEmails = () =>
  cron.schedule(
    // '0 0 * * *',

    '* * * * * *',
    async () => {
      const sheduledEmails = await getScheduledEmails();

      const editedSheduledEmails = [...sheduledEmails];

      cron.schedule(
        // 'running a task every 15 minutes'
        '*/15 * * * *',
        async () => {
          // last element
          const emailDetails = sheduledEmails[sheduledEmails.length - 1];
          const recipients = emailDetails.participantsEmails
            .filter(item => item.status === 'confirmed')
            .map(item => item.email);

          const surveyURL = {
            surveyType: emailDetails.scheduledEmails.surveyType,
            surveyURL: `${process.env.DOMAIN}/survey/${emailDetails.scheduledEmails.surveyType}&${emailDetails.shortId}`,
          };

          await sendSurvey({
            surveyURLs: [surveyURL],
            participantsList: recipients,
          });

          const data = {
            sessionId: emailDetails._id,
            sentEmailId: emailDetails.scheduledEmails._id,
          };
        },
        {
          scheduled: true,
          timezone: 'Europe/London',
        }
      );
    },
    {
      scheduled: true,
      timezone: 'Europe/London',
    }
  );

module.exports = sendScheduledEmails;
