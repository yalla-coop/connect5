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

// remove trainer from a localLead group
module.exports.removeTrainerFromGroup = (localLeadId, trainerId) => {
  return User.bulkWrite([
    {
      updateOne: {
        filter: { _id: localLeadId },
        update: {
          $pullAll: { trainersGroup: [mongoose.Types.ObjectId(trainerId)] },
        },
      },
    },
    {
      updateOne: {
        filter: { _id: trainerId },
        update: {
          $unset: { localLead: '' },
        },
      },
    },
  ]);
};

// remove trainer from a localLead group
module.exports.removeLocalLeadFromUser = localLeadId => {
  return User.bulkWrite([
    {
      updateMany: {
        filter: { localLead: localLeadId },
        update: {
          $unset: { localLead: '' },
        },
      },
    },
  ]);
};

// get localLead group

module.exports.getLocalLeadTrainersGroup = id => {
  return User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },

    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'trainersGroup',
        as: 'group',
      },
    },
  ]);
};
