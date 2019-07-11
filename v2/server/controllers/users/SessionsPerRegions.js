const boom = require('boom');

const {
  getSessionsPerRegionsQuery,
} = require('./../../database/queries/users/getSessionsPerRegion');

module.exports = async (req, res, next) => {
  getSessionsPerRegionsQuery()
    .then(sessions => {
      if (!sessions) {
        return next(boom.notFound('No sessions founded'));
      }
      return res.json(sessions);
    })
    .catch(err => {
      boom.badImplementation();
    });
};
