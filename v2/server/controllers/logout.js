module.exports = (req, res) => {
  res.clearCookie('token');
  res.send();
};
