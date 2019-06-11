const getResponseRate = (sessions, surveys) => {
  const obj = {};
  sessions.forEach(s => {
    obj[s._id] = s.participants;
  });

  return surveys.map(survey => {
    switch (survey._id) {
      case 'pre-day-1': {
        const responseRate = ((survey.responses / obj['1']) * 100).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }
      case 'post-day-1': {
        const responseRate = ((survey.responses / obj['1']) * 100).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }
      case 'post-day-2': {
        const responseRate = ((survey.responses / obj['2']) * 100).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }
      case 'post-day-3': {
        const responseRate = ((survey.responses / obj['3']) * 100).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }
      case 'post-special': {
        const responseRate = (
          (survey.responses / obj['special-2-days']) *
          100
        ).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }
      case 'pre-train-trainers': {
        const responseRate = (
          (survey.responses / obj['train-trainers']) *
          100
        ).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }
      case 'post-train-trainers': {
        const responseRate = (
          (survey.responses / obj['train-trainers']) *
          100
        ).toFixed(1);
        return { ...survey, responseRate: `${responseRate}%` };
      }

      default: {
        const responseRate = 'N.A';
        return { ...survey, responseRate };
      }
    }
  });
};

module.exports = getResponseRate;
