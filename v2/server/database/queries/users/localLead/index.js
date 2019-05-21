const User = require('./../../../models/User');

module.exports.getAllLocalLeads = () => User.find({ role: 'localLead' });

module.exports.addTrainertoGroup = (localLeadId, trainerId) =>
  User.findByIdAndUpdate(localLeadId, { $push: { trainersGroup: trainerId } });
