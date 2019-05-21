const { verify } = require('jsonwebtoken');
const boom = require('boom');

const { getUserById } = require('./../database/queries/users');

module.exports = () => (req, res, next) => {
  // get cookies from the request
  const { cookies } = req;

  // if no cookies or token send unauthorized error
  if (!cookies || !cookies.token) {
    return next(boom.unauthorized('no credentials'));
  }

  // verify the token
  return verify(cookies.token, process.env.SECRET, (err, decoded) => {
    // if not valid send unauthorized error
    if (err) {
      res.clearCookie('token');
      return next(boom.unauthorized('credentials are not valid'));
    }

    // get the user  Id from token
    const { id } = decoded;
    return getUserById(id, true)
      .then(user => {
        // put the user info in the req to be accessed in the next middlewares
        req.user = user;
        next();
      })
      .catch(() => next(boom.badImplementation()));
  }).catch(() => next(boom.badImplementation()));
};
