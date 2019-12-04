const { verify } = require('jsonwebtoken');
const boom = require('boom');
const {
  getUserById,
  getParticipantById,
} = require('./../database/queries/users');

module.exports = () => async (req, res, next) => {
  try {
    // get cookies from the request
    const { cookies } = req;

    // if no cookies or token send unauthorized error
    if (!cookies || !cookies.token) {
      return next(boom.unauthorized('no credentials'));
    }
    let decoded;

    // verify the token
    try {
      decoded = verify(cookies.token, process.env.SECRET);
    } catch (error) {
      res.clearCookie('token');
      return next(boom.unauthorized('credentials are not valid'));
    }

    // get the user  Id  and the role from token
    const { id, role, email } = decoded;
    let user = {};
    // check for the role
    // role = participant get data from participant table
    if (role === 'participant') {
      if (id) {
        user = await getParticipantById(id);
      } else if (email) {
        user.email = email;
      }
      user.role = 'participant';
    } else {
      // role === admin, localLead, trainer
      // get data from user table
      user = await getUserById(id, true);
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(boom.badImplementation());
  }
};
