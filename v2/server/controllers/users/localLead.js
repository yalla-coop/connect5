/* eslint-disable no-param-reassign */
const boom = require('boom');
const User = require('../../database/models/User');

const {
  getLocalLeadsSessions,
  getTeamLeadSuerveys,
} = require('../../database/queries/users/loaclLead');

exports.getLocalLeadOverview = async (req, res, next) => {
  // this is temp unit the login is in-place
  const EMAIL = 'nisha.sharma@phe.gov.uk';
  const user = await User.findOne({ email: EMAIL });
  try {
    const sessions = await getLocalLeadsSessions(user.id);
    const surveys = await getTeamLeadSuerveys(user.id);

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
