const boom = require('boom');

const {
  getLocalLeadSessions,
} = require('../../database/queries/users/getLeadSessions');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await getLocalLeadSessions(id);
    const { sessions } = data[0];

    if (!sessions) {
      return next(boom.notFound('No sessions founded'));
    }
    return res.json(sessions);
  } catch (err) {
    return next(boom.badImplementation());
  }
};
