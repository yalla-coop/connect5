const cron = require('node-cron');
const moment = require('moment');

const sendSurvey = require('./../helpers/emails/sendSurvey');

const {
  addSentEmail,
} = require('./../database/queries/sessionDetails/session');

const {
  getScheduledEmails,
  removeScheduledEmail,
} = require('./../database/queries/sessionDetails/scheduleEmails');

const sendScheduledEmails = () =>
  // run the cron job function at the head of every hour
  // at London time zone
  cron.schedule(
    '0 * * * *',
    async () => {
      const sheduledEmails = await getScheduledEmails();

      const editedSheduledEmails = [...sheduledEmails];

      if (editedSheduledEmails.length < 1) {
        return;
      }

      const sendEmailsTask = cron.schedule(
        // 'running a task every 15 minutes'
        // to avoid block the email by sending a lot of emails at once
        '*/15 * * * *',
        async () => {
          try {
            // if all email have been sent, then stop the function
            if (editedSheduledEmails.length < 1) {
              return sendEmailsTask.destroy();
            }

            // get last element
            const emailDetails = sheduledEmails[sheduledEmails.length - 1];
            const recipients = emailDetails.participantsEmails
              .filter(item => item.status === 'confirmed')
              .map(item => item.email);

            const surveyURL = {
              surveyType: emailDetails.scheduledEmails.surveyType,
              surveyURL: `${process.env.DOMAIN}/survey/${emailDetails.scheduledEmails.surveyType}&${emailDetails.shortId}`,
            };

            if (emailDetails.length) {
              // send the survey by email
              await sendSurvey({
                surveyURLs: [surveyURL],
                participantsList: recipients,
              });
            }

            const trainers = emailDetails.trainers
              .map(item => item.name)
              .join(' & ');

            const emailData = {
              sendDate: moment().format('YYYY-MM-DD'),
              trainers,
              sessionDate: moment(emailDetails.date).format('YYYY-MM-DD'),
              sessionType: emailDetails.type,
              location: emailDetails.address,
              startTime: emailDetails.startTime,
              endTime: emailDetails.endTime,
              recipients: emailDetails.participantsEmails.filter(
                item => item.status === 'confirmed'
              ),
            };

            // add the sent email to the session email history
            await addSentEmail({
              sessionId: emailDetails._id,
              emailData,
              type: 'surveyLink',
              serveyLink: surveyURL,
            });

            // delete the sent email from the scheduled emails
            await removeScheduledEmail({
              sessionId: emailDetails._id,
              scheduledEmailId: emailDetails.scheduledEmails._id,
            });

            // delete the scheduled email from the tasks list
            return editedSheduledEmails.pop();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            return error;
          }
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
