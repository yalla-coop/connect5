/* eslint-disable no-param-reassign */
const boom = require('boom');

const {
  getTrianerSessions,
  getTrainerSuerveys,
} = require('../../database/queries/users/trainerResults');

exports.getTrianerReachData = async (req, res, next) => {
  const { user } = req;
  try {
    const sessions = await getTrianerSessions(user.id);
    const surveys = await getTrainerSuerveys(user.id);

    const obj = {};
    sessions.forEach(s => {
      obj[s._id] = s.participants;
    });

    surveys.forEach(survey => {
      if (survey._id === 'pre-day-1' || survey._id === 'post-day-1') {
        survey.participants = obj['1'];
        survey.responseRate = Math.ceil((survey.responses / obj['1']) * 100);
      }
      if (survey._id === 'post-day-2') {
        survey.participants = obj['2'];
        survey.responseRate = Math.ceil((survey.responses / obj['2']) * 100);
      } else if (survey._id === 'post-day-3') {
        survey.participants = obj['3'];
        survey.responseRate = Math.ceil((survey.responses / obj['3']) * 100);
      }
    });
    const results = { sessions, surveys };
    return res.json(results);
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};
