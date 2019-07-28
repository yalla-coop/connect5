const boom = require('boom');
const { addEmail } = require('./../../database/queries/sessionDetails/session');
const sendSessionReminder = require('./../../helpers/emails/sendSessionReminder');

const preSurveys = {
  1: 'pre-day-1',
  'special-2-days': 'pre-special',
  'train-trainers': 'pre-train-trainers',
};

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { type } = req.query;
  const { shortId, ...emailData } = req.body;

  if (type !== 'reminder') {
    return next();
  }

  const preSurvey = preSurveys[emailData.sessionType];

  let preServeyLink = null;

  if (preSurvey !== undefined) {
    preServeyLink = `${process.env.DOMAIN}/survey/${preSurvey}&${shortId}`;
  }

  const promises = [
    addEmail({ sessionId, emailData, type, preServeyLink }),
    sendSessionReminder({ shortId, ...emailData, preServeyLink }),
  ];
  return Promise.all(promises)
    .then(() => {
      return res.json({});
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
