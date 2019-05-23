const boom = require('boom');
const {
  getTrainerSessionsQuery,
} = require('./../../../database/queries/users/trainer');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  getTrainerSessionsQuery(id)
    .then(sessions => {
      if (!sessions) {
        return next(boom.notFound('No sessions founded'));
      }
      console.log(sessions);
      return res.json(sessions);
    })
    .catch(err => {
      boom.badImplementation();
    });
};
