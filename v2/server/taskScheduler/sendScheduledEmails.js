const cron = require('node-cron');
const moment = require('moment');

const sendSessionReminder = require('./../helpers/emails/sendSessionReminder');

const {
  addSentEmail,
} = require('./../database/queries/sessionDetails/session');

const { getPreSurveyLink, getPostSurveyLink } = require('./../helpers');

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
            const {
              recipients,
              extraInformation,
              surveyType,
              // string
              trainer,
            } = emailDetails.scheduledEmails;

            const trainers = emailDetails.trainers
              .map(
                _trainer =>
                  `${_trainer.name[0].toUpperCase()}${_trainer.name.slice(1)}`
              )
              .join(' & ');

            let fullAddress = '';

            if (emailDetails.address) {
              const {
                postcode,
                addressLine1,
                addressLine2,
              } = emailDetails.address;
              if (postcode || addressLine1 || addressLine2) {
                fullAddress = [addressLine1, addressLine2, postcode]
                  .filter(item => !!item)
                  .join(', ');
              }
            }

            const preSurveyLink = getPreSurveyLink(
              surveyType,
              emailDetails.shortId
            );
            const postSurveyLink = getPostSurveyLink(
              surveyType,
              emailDetails.shortId
            );

            await sendSessionReminder({
              extraInformation,
              recipients,
              sessionDate: moment(emailDetails.date).format('YYYY-MM-DD'),
              sessionType: emailDetails.type,
              trainers,
              trainer,
              address: fullAddress || 'TBC',
              startTime: emailDetails.startTime,
              endTime: emailDetails.endTime,
              shortId: emailDetails.shortId,
              preSurveyLink,
              postSurveyLink,
            });

            const emailData = {
              sendDate: moment().format('YYYY-MM-DD'),
              trainers,
              sessionDate: moment(emailDetails.date).format('YYYY-MM-DD'),
              sessionType: emailDetails.type,
              address: emailDetails.address,
              startTime: emailDetails.startTime,
              endTime: emailDetails.endTime,
              recipients,
              preSurveyLink,
              postSurveyLink,
              trainer,
            };

            // add the sent email to the session email history
            await addSentEmail({
              sessionId: emailDetails._id,
              emailData,
              type: 'surveyLink',
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
