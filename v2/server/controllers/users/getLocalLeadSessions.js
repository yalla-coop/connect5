const boom = require('boom');

const {
  getLocalLeadSessions,
} = require('../../database/queries/users/getLeadSessions');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await getLocalLeadSessions(id);
    let sessions;

    if (data.length === 0) {
      sessions = [];
    } else {
      // eslint-disable-next-line prefer-destructuring
      sessions = data[0].sessions;
    }
    return res.json(sessions);
  } catch (err) {
    return next(boom.badImplementation());
  }
};
