const { surveysSessionsPairs } = require('./../constants');

const getResponseRate = (sessions, surveys) => {
  const obj = {};
  sessions.forEach(s => {
    obj[s._id] = s.participants;
  });

  return surveys.map(survey => {
    const session = surveysSessionsPairs[survey._id];
    if (session) {
      const responseRate = survey.responses
        ? `${((survey.responses / obj[session]) * 100).toFixed(1)}%`
        : 'N.A';
      return { ...survey, responseRate };
    }
    const responseRate = 'N.A';
    return { ...survey, responseRate };
  });
};

module.exports = getResponseRate;
