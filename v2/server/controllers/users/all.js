/* eslint-disable no-param-reassign */
const boom = require('boom');
const User = require('../../database/models/User');

const getTopStats = require('../../database/queries/users/topStats');

exports.getDashboardStats = async (req, res, next) => {
  // this is temp until log in is in place
  const user = await User.findOne({ role: 'trainer' });

  // we need to send the type from the front in case user is localLead or admin but viewing the app in trainer view (i.e. for their own results)

  const { userType } = req.body;

  try {
    const stats = await getTopStats(user.id, userType);
    return res.json({ stats, userType });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
