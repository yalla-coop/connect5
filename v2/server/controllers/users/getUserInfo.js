module.exports = (req, res) => {
  const { user } = req;
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
    };
  }

  res.json(userInfo);
};
