/* eslint-disable no-param-reassign */
const boom = require('boom');

const getTopStats = require('../../database/queries/users/topStats');

exports.getDashboardStats = async (req, res, next) => {
  const { user } = req;

  // we need to send the type from the front in case user is localLead or admin but viewing the app in trainer view (i.e. for their own results)

  console.log(user);

  const { userType } = req.body;

  try {
    const stats = await getTopStats(user.id, userType);
    return res.json({ stats, userType, userId: user.id });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
