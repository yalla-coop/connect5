const boom = require('boom');
const { getAllManagersQuery } = require('./../../database/queries/users');

module.exports = async (req, res, next) => {
  const { managers: managersIds } = req.user;
  getAllManagersQuery(managersIds)
    .then(managersNames => {
      if (!managersNames) {
        return next(boom.notFound('No managers founded'));
      }
      return res.json(managersNames);
    })
    .catch(err => {
      boom.badImplementation();
    });
};
