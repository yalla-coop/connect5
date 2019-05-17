/* eslint-disable no-param-reassign */
const boom = require('boom');
const User = require('../../database/models/User');

const {
  getLocalLeadsSessions,
  getTeamLeadSuerveys,
} = require('../../database/queries/users/loaclLead');

const {
  getAdminSessions,
  getAdminSuerveys,
} = require('../../database/queries/users/admin');

const {
  getTrianerSessions,
  getTrainerSuerveys,
} = require('../../database/queries/users/trainerResults');

exports.getUserResults = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  const { role } = user;

  let sessions;
  let surveys;

  try {
    switch (role) {
      case 'localLead':
        sessions = await getLocalLeadsSessions(id);
        surveys = await getTeamLeadSuerveys(id);
        break;
      case 'admin':
        sessions = await getAdminSessions(id);
        surveys = await getAdminSuerveys(id);
        break;

      default:
        sessions = await getTrianerSessions(id);
        surveys = await getTrainerSuerveys(id);
        break;
    }
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
