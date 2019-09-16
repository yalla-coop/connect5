const mongoose = require('mongoose');

const User = require('../../models/User');

module.exports.deleteTrainerAccount = (trainerId, managers = []) => {
  const ObjeIds = managers.map(id => mongoose.Types.ObjectId(id));

  return User.bulkWrite([
    {
      updateMany: {
        filter: { _id: { $in: ObjeIds } },
        update: {
          $pullAll: { trainersGroup: [mongoose.Types.ObjectId(trainerId)] },
        },
      },
    },
    {
      deleteOne: {
        filter: { _id: mongoose.Types.ObjectId(trainerId) },
      },
    },
  ]);
};

module.exports.deleteLocalLeadAccount = (localLeadId, trainersGroup) => {
  const ObjeIds = trainersGroup.map(id => mongoose.Types.ObjectId(id));
  return User.bulkWrite([
    {
      updateMany: {
        filter: { _id: { $in: ObjeIds } },
        update: {
          $pullAll: { managers: [mongoose.Types.ObjectId(localLeadId)] },
        },
      },
    },
    {
      deleteOne: {
        filter: { _id: mongoose.Types.ObjectId(localLeadId) },
      },
    },
  ]);
};
