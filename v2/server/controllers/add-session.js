const boom = require('boom');
const createNewsession = require('./../database/queries/add_session');
const sendSurvey = require('../helpers/emails/sendSurvey');

const addSession = async (req, res, next) => {
  const { user } = req;
  const {
    session,
    startDate,
    inviteesNumber,
    region,
    partnerTrainer1,
    partnerTrainer2,
    emails,
    sendByEmail,
  } = req.body;

  const trainers = [];
  try {
    if (session && startDate && inviteesNumber && region && emails) {
      if (partnerTrainer1) {
        trainers.push(partnerTrainer2);
      } else if (partnerTrainer2) {
        trainers.push(partnerTrainer2);
      } else {
        trainers.push(user._id);
      }

      const addedSession = await createNewsession({
        startDate,
        session,
        inviteesNumber,
        region,
        trainers,
        emails,
      });

      if (sendByEmail) {
        const surveyType = {
          1: ['pre-day-1', 'post-day-1'],
          2: ['post-day-2'],
          3: ['post-day-3'],
          'special-2-days': ['pre-special', 'post-special'],
          'train-trainers': ['pre-train-trainers', 'post-train-trainers'],
        };

        const links = surveyType[session].map(item => {
          return {
            surveyType: item,
            surveyURL: `${process.env.DOMAIN}/survey/${item}&${
              addedSession.shortId
            }`,
          };
        });

        if (process.env.NODE_ENV === 'production') {
          // send the survey link to participants
          await sendSurvey({
            surveyURLs: links,
            participantsList: emails,
          });
        }
      }
      return res.json(addedSession);
    }

    return next(boom.badRequest('Some arguments are missed'));
  } catch (error) {
    return next(boom.badImplementation());
  }
};

module.exports = addSession;
