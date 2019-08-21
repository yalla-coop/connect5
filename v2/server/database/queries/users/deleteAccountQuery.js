const mongoose = require('mongoose');

const User = require('../../models/User');

module.exports.deleteAccount = userId => {
  return User.findOneAndDelete({ _id: userId });
};
