module.exports = (req, res) => {
  const { user } = req;
  const userInfo = {
    id: user._id,
    name: user.name,
    role: user.role,
    organization: user.organization,
    region: user.region,
    email: user.email,
  };

  res.json(userInfo);
};
