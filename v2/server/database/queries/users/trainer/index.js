const User = require('./../../../models/User');

module.exports.createNewTrainer = data => User.create(data);
