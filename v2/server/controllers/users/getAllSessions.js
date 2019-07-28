const boom = require('boom');
const { getAllSessionsQuery } = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  getAllSessionsQuery()
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
