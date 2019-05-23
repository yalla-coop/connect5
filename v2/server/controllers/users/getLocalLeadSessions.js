const boom = require('boom');
const {
  getLocalLeadSessionsQuery,
  getAdminSessionsQuery,
} = require('./../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;
  const promise =
    role === 'localLead'
      ? getLocalLeadSessionsQuery(id)
      : getAdminSessionsQuery();

  promise
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
