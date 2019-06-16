const mongoose = require('mongoose');

const Session = require('../../models/Session');
const User = require('../../models/User');

// sum of trainer sessions and atendees grouped by type
module.exports.getTrianerSessions = trainerId => {
  return Session.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
  ]);
};

module.exports.getLocalLeadSessions = localLeadId => {
  return User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(localLeadId) },
    },
    {
      $unwind: '$trainersGroup',
    },
    {
      $lookup: {
        from: 'sessions',
        localField: 'trainersGroup',
        foreignField: 'trainers',
        as: 'sessions',
      },
    },
    {
      $match: { sessions: { $exists: true, $ne: [] } },
    },
    {
      $group: {
        _id: null,
        sessions: { $addToSet: '$sessions' },
      },
    },
    {
      $project: {
        _id: 0,
        sessions: {
          $reduce: {
            input: '$sessions',
            initialValue: [],
            in: {
              $concatArrays: ['$$this', '$$value'],
            },
          },
        },
      },
    },
    { $unwind: '$sessions' },
    {
      $group: {
        _id: '$_id',
        sessions: { $addToSet: '$sessions' },
      },
    },
  ]);
};
