const boom = require('boom');

module.exports = (req, res, next) => {
  const { user } = req;
  try {
    let userInfo;
    if (user.role === 'participant') {
      userInfo = {
        id: user._id,
        PIN: user.PIN,
        role: 'participant',
      };
    } else {
      userInfo = {
        id: user._id,
        name: user.name,
        role: user.role,
        organization: user.organization,
        region: user.region,
        email: user.email,
        localLead: user.localLead,
        officialLocalLead: user.officialLocalLead,
        managers: user.managers,
      };
    }

    return res.json(userInfo);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
