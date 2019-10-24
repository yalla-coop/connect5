const { surveysSessionsPairs } = require('./../constants');

const getResponseRate = (sessions, surveys) => {
  const obj = {};
  sessions.forEach(s => {
    obj[s._id] = s.participants;

    const emails = [];
    s.emails.forEach(emailGroup => {
      emailGroup
        .filter(email => email.status === 'confirmed')
        .map(email => emails.push(email));
    });

    obj[s._id] = emails.length;
  });

  return surveys.map(survey => {
    const session = surveysSessionsPairs[survey._id];
    if (session) {
      const responseRate = survey.responses
        ? `${((survey.responses / obj[session]) * 100).toFixed(1)}%`
        : 'N.A';
      return {
        ...survey,
        responseRate: obj[session] ? responseRate : `No confirmed participants`,
      };
    }
    const responseRate = 'N.A';
    return { ...survey, responseRate };
  });
};

module.exports = getResponseRate;
