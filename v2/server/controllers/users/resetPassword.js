const boom = require('boom');
const { hash } = require('bcryptjs');
const {
  findUserByToken,
  updateUserById,
} = require('./../../database/queries/users');

module.exports = (req, res, next) => {
  const { token, newPassword } = req.body;
  // check if the token is valid
  findUserByToken(token)
    .then(async user => {
      if (!user) {
        const error = new Error(
          'Your token is invalid or has expired, reset the password again please'
        );
        error.status = 401;
        throw error;
      }

      const hashedPassword = await hash(newPassword, 8);

      // update the user's new password and delete the token
      const updateData = {
        password: hashedPassword,
        resetToken: {
          value: undefined,
          expiresIn: undefined,
        },
      };
      return updateUserById(user.id, updateData);
    })
    .then(() => {
      // send success response
      res.json({ success: true });
    })
    .catch(error => {
      if (error.status === 401) {
        return next(boom.unauthorized(error.message));
      }
      return next(boom.badImplementation());
    });
};
