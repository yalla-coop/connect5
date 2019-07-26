const boom = require('boom');
const crypto = require('crypto');
const { resetTokenMaxAge } = require('./../../constants');
const {
  getUserByEmail,
  updateUserById,
} = require('./../../database/queries/users');
const resetPasswordMailing = require('../../helpers/emails/resetPasswordByEmail');

module.exports = (req, res, next) => {
  const { email } = req.query;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return next(boom.badImplimentation());
    }
    const token = buffer.toString('hex');

    return getUserByEmail(email)
      .then(user => {
        if (!user) {
          return next(boom.unauthorized('No account with that email found'));
        }
        const { _id } = user;

        const data = {
          resetToken: {
            value: token,
            expiresIn: Date.now() + resetTokenMaxAge,
          },
        };
        updateUserById(_id, data)
          // send the token via email

          .then(() => resetPasswordMailing(email, token, user.name))
          .then(() => {
            //  send success message
            res.json({ success: true });
          });
      })
      .catch(err => {
        console.log(err);
        next(boom.badImplementation());
      });
  });
};
