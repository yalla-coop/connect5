const User = require('./../models/User');

module.exports.findByEmail = email => User.findOne({ email });
