const boom = require('boom');
const { getUserByEmail } = require('./../../database/queries/users');

module.exports = (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return next();
  }

  return getUserByEmail(email)
    .then(user => {
      if (user) {
        res.json({ isUnique: false });
      } else {
        res.json({ isUnique: true });
      }
    })
    .catch(err => {
      boom.badImplementation();
    });
};
