const boom = require('boom');
const { compare, hash } = require('bcryptjs');
const {
  getUserById,
  updateUserPasswordById,
} = require('./../../database/queries/user');

module.exports = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  const updateData = {};

  getUserById(id)
    .then(user => {
      if (!user) {
        // user is not found
        return next(boom.unauthorized('No user is found'));
      }
      if (oldPassword && newPassword) {
        // hash password
        compare(oldPassword, user.password).then(matched => {
          if (!matched) {
            return next(boom.unauthorized('Incorrect password'));
          }

          hash(newPassword, 8).then(x => {
            updateData.password = x;

            updateUserPasswordById(user.id, x).then(x => {
              return res.json(user);
            });
          });
        });
      }
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
