const boom = require('boom');
const crypto = require('crypto');
const { resetTokenMaxAge } = require('./../../constants');
const {
  getUserByEmail,
  updateUserById,
} = require('./../../database/queries/users');
const resetPasswordMailing = require('../../helpers/emails/resetPasswordByEmail');
const sendSignUpLinkByEmail = require('../../helpers/emails/sendSignUpLinkByEmail');

module.exports = (req, res, next) => {
  const { email } = req.query;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return next(boom.badImplimentation(err));
    }
    const token = buffer.toString('hex');

    return getUserByEmail(email)
      .then(user => {
        if (!user) {
          if (process.env.NODE_ENV === 'production') {
            sendSignUpLinkByEmail(email);
          }
          return res.json({ success: true });
        }

        const { _id } = user;

        const data = {
          resetToken: {
            value: token,
            expiresIn: Date.now() + resetTokenMaxAge,
          },
        };
        return (
          updateUserById(_id, data)
            // send the token via email

            .then(() => {
              if (process.env.NODE_ENV === 'production') {
                resetPasswordMailing(email, token, user.name);
              }
            })
            .then(() => {
              //  send success message
              res.json({ success: true });
            })
        );
      })
      .catch(error => {
        next(boom.badImplementation(error));
      });
  });
};
