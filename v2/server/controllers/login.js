const jwt = require('jsonwebtoken');
const boom = require('boom');
const { findByEmail } = require('./../database/queries/user');
const { tokenMaxAge } = require('./../constants');
const { updateUserById } = require('./../database/queries/users');

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  findByEmail(email).then(user => {
    if (!user) {
      // user is not found
      return next(
        boom.unauthorized('login failed, email and password not match')
      );
    }

    const { givenPermission } = user;

    // check password
    return user
      .isCorrectPassword(password)
      .then(async matched => {
        if (!matched) {
          return next(
            boom.unauthorized('login failed, email and password not match')
          );
        }

        // check if the trainer is logged in for first time then update the givenPermission
        // to be true
        if (user.role === 'trainer' && !givenPermission) {
          await updateUserById(user._id, { givenPermission: true });
        }

        // data to be sent in the response
        const userInfo = {
          id: user._id,
          name: user.name,
          role: user.role,
          organization: user.organization,
          region: user.region,
          email: user.email,
          localLead: user.localLead,
          officialLocalLead: user.officialLocalLead,
        };

        // create token for 25 day
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.SECRET,
          {
            expiresIn: tokenMaxAge.string,
          }
        );
        res.cookie('token', token, {
          maxAge: tokenMaxAge.number,
          httpOnly: true,
        });

        // send the user info
        return res.json(userInfo);
      })
      .catch(err => next(boom.badImplementation()));
  });
};
