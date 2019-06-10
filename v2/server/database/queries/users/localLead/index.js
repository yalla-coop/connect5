const mongoose = require('mongoose');
const User = require('./../../../models/User');
const Session = require('./../../../models/Session');

module.exports.getAllLocalLeads = () => User.find({ role: 'localLead' });

module.exports.addTrainertoGroup = (localLeadId, trainerId) =>
  User.findByIdAndUpdate(localLeadId, { $push: { trainersGroup: trainerId } });

module.exports.getLocalLeadSessionsQuery = id => {
  return Session.find({ trainers: mongoose.Types.ObjectId(id) });
};

module.exports.getAdminSessionsQuery = () => {
  return Session.find({});
};
