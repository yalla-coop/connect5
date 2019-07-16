const boom = require('boom');
const { getUserByEmail } = require('./../../database/queries/users');

module.exports = (req, res, next) => {
  const { email } = req.query;
  if (!email) {
    return next();
  }

  return getUserByEmail(email)
    .then(user => {
      if (!user) {
        return next(
          boom.unauthorized('login failed, email and password not match')
        );
      }

      const userData = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      };
    })
    .catch(err => {
      boom.badImplementation();
    });
};
