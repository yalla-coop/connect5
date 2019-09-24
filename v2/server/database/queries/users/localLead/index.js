const mongoose = require('mongoose');
const User = require('./../../../models/User');

module.exports.getAllLocalLeads = () => User.find({ role: 'localLead' });

module.exports.addTrainertoGroup = (localLeadId, trainerId) => {
  return User.findByIdAndUpdate(localLeadId, {
    $push: { trainersGroup: trainerId },
  });
};

module.exports.getLocalLeadsNames = (oldLocalLeadId, newLocalLeadId) => {
  const ids = [oldLocalLeadId, newLocalLeadId];

  return User.find({ _id: { $in: ids } });
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
          $set: { localLead: mongoose.Types.ObjectId(localLeadId) },
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
          $pullAll: { localLead: [mongoose.Types.ObjectId(localLeadId)] },
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
    {
      $project: {
        'group.password': 0,
      },
    },
  ]);
};
