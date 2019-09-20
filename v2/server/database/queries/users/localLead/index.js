const mongoose = require('mongoose');
const User = require('./../../../models/User');

module.exports.getAllLocalLeads = () => User.find({ role: 'localLead' });

module.exports.addTrainerToGroups = async (managers, trainer) => {
  const bulkOp = managers.map(({ key }) => {
    return {
      updateOne: {
        filter: { _id: mongoose.Types.ObjectId(key) },
        update: { $push: { trainersGroup: trainer } },
        upsert: true,
      },
    };
  });

  return User.bulkWrite(bulkOp);
};

module.exports.addManagersToTrainer = (managers, trainerId) => {
  const bulkOp = managers.map(({ key }) => {
    return {
      updateOne: {
        filter: { _id: mongoose.Types.ObjectId(trainerId) },
        update: { $push: { managers: mongoose.Types.ObjectId(key) } },
      },
    };
  });

  return User.bulkWrite(bulkOp);
};

// remove trainer from a localLead group
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
          $pullAll: { managers: [mongoose.Types.ObjectId(localLeadId)] },
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
