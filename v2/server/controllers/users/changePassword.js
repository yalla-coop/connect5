const boom = require('boom');
const { compare, hash } = require('bcryptjs');
const {
  getUserById,
  updateUserPasswordById,
} = require('./../../database/queries/user');

console.log(updateUserPasswordById, 'sssssssssssssss');

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
      if ((oldPassword, newPassword)) {
        // hash password
        const matched = compare(oldPassword, user.password);
        if (!matched) {
          return next(boom.unauthorized('Incorrect password'));
        }
        const hashedPassword = hash(newPassword, 8);
        updateData.password = hashedPassword;
      }
      updateUserPasswordById(user.id, updateData.password);
      return res.json(user);
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
