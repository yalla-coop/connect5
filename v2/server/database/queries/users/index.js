const User = require('./../../models/User');

module.exports.getUserByEmail = email => User.findOne({ email });
module.exports.getUserById = id => User.findById(id);
