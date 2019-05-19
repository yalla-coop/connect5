const User = require('./../../models/User');

module.exports.getUserByEmail = email => User.findOne({ email });
