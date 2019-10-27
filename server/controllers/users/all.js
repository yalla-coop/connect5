/* eslint-disable no-param-reassign */
const boom = require('boom');

const getTopStats = require('../../database/queries/users/topStats');

exports.getDashboardStats = async (req, res, next) => {
  const { user } = req;

  // userType === role
  const { userType } = req.body;

  try {
    const stats = await getTopStats(user.id, userType);
    return res.json({ stats, userType, userId: user.id });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
