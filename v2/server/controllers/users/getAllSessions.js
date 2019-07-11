const boom = require('boom');
const { getAllSessionsQuery } = require('./../../database/queries/users');

const {
  getSessionsPerRegionsQuery,
} = require('./../../database/queries/users/getSessionsPerRegion');

module.exports = async (req, res, next) => {
  getAllSessionsQuery()
    .then(sessions => {
      if (!sessions) {
        return next(boom.notFound('No sessions founded'));
      }
      const sessionsCount = sessions.length;
      return res.json(sessionsCount);
    })
    .catch(err => {
      boom.badImplementation();
    });
};

module.exports = async (req, res, next) => {
  getSessionsPerRegionsQuery()
    .then(sessions => {
      if (!sessions) {
        return next(boom.notFound('No sessions founded'));
      }
      console.log(sessions, 'sessions');
      return res.json(sessions);
    })
    .catch(err => {
      boom.badImplementation();
    });
};
