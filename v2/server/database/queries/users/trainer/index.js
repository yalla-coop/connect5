const mongoose = require('mongoose');
const User = require('./../../../models/User');
const Session = require('./../../../models/Session');

module.exports.createNewTrainer = data => User.create(data);

module.exports.getTrainerSessionsQuery = id => {
  return Session.find({ trainers: mongoose.Types.ObjectId(id) });
};
