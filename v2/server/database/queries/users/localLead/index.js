const User = require('./../../../models/User');

module.exports.getAllLocalLeads = () => User.find({ role: 'localLead' });
