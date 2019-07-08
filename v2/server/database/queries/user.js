const User = require('./../models/User');
const Response = require('./../models/Response');

module.exports.findByEmail = email => User.findOne({ email });
module.exports.findByPIN = PIN => Response.findOne({ PIN });
module.exports.getUserById = id => User.findById(id);
module.exports.updateUserPasswordById = (userId, password) =>
  User.findByIdAndUpdate(userId, password, { new: true });
