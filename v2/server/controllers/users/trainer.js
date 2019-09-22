/* eslint-disable no-param-reassign */
const boom = require('boom');
const { surveysSessionsPairs } = require('./../../constants');

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
      const sessionType = surveysSessionsPairs[survey._id];
      survey.participants = obj[sessionType];
      survey.responseRate = Math.ceil(
        (survey.responses / obj[sessionType]) * 100
      );
    });
    const results = { sessions, surveys };
    return res.json(results);
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};
