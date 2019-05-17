/* eslint-disable no-param-reassign */
const boom = require('boom');

const {
  getAdminSessions,
  getAdminSuerveys,
} = require('../../database/queries/users/admin');

exports.getAdminOverview = async (req, res, next) => {
  try {
    const sessions = await getAdminSessions();
    const surveys = await getAdminSuerveys();

    // the map function
    const obj = {};
    sessions.forEach(s => {
      obj[s._id] = s.participants;
    });

    surveys.map(survey => {
      if (survey._id === 'pre-day-1' || survey._id === 'post-day-1') {
        survey.participants = obj['1'];
        survey.responseRate = ((survey.responses / obj['1']) * 100).toFixed(2);
      } else if (survey._id === 'post-day-2') {
        survey.participants = obj['2'];
        survey.responseRate = ((survey.responses / obj['2']) * 100).toFixed(2);
      } else if (survey._id === 'post-day-3') {
        survey.participants = obj['3'];
        survey.responseRate = ((survey.responses / obj['3']) * 100).toFixed(2);
      } else if (survey._id === 'post-special') {
        survey.participants = obj['3'];
        survey.responseRate = ((survey.responses / obj['3']) * 100).toFixed(2);
      } else if (survey._id === 'pre-train-trainers') {
        survey.participants = obj['3'];
        survey.responseRate = ((survey.responses / obj['3']) * 100).toFixed(2);
      } else if (survey._id === 'post-train-trainers') {
        survey.participants = obj['3'];
        survey.responseRate = ((survey.responses / obj['3']) * 100).toFixed(2);
      } else if (survey._id === 'follow-up-3-month') {
        survey.participants = obj['3'];
        survey.responseRate = ((survey.responses / obj['3']) * 100).toFixed(2);
      } else if (survey._id === 'follow-up-6-month') {
        survey.participants = obj['3'];
        survey.responseRate = ((survey.responses / obj['3']) * 100).toFixed(2);
      }
    });

    // res
    const results = { sessions, surveys };
    return res.json(results);
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};
