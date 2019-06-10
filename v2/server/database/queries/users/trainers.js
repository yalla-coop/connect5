const User = require('../../models/User');

module.exports.getAllTrainers = () => User.find({ role: 'trainer' });
