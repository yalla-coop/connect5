const User = require('./../models/User');
const Response = require('./../models/Response');

module.exports.findByEmail = email => User.findOne({ email });
module.exports.findByPIN = PIN => Response.findOne({ PIN });
