const mongoose = require('mongoose');

const Session = require('../../models/Session');

// sum of trainer sessions and atendees grouped by type
module.exports.getTrianerSessions = trainerId => {
  return Session.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
  ]);
};

module.exports.getLocalLeadSessions = localLeadId => {
  return Session.find({ canAccessResults: localLeadId });
};
