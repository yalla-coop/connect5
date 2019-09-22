const boom = require('boom');

const {
  getLocalLeadSessions,
} = require('../../database/queries/users/getLeadSessions');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sessions = await getLocalLeadSessions(id);
    return res.json(sessions);
  } catch (err) {
    return next(boom.badImplementation());
  }
};
