const mongoose = require('mongoose');
const User = require('./../../../models/User');
const Response = require('./../../../models/Response');
const Session = require('./../../../models/Session');

module.exports.createNewTrainer = data => User.create(data);

module.exports.updateTrainer = (id, data) => User.findByIdAndUpdate(id, data);

module.exports.getTrainerSessionsQuery = id => {
  return Session.find({ trainers: mongoose.Types.ObjectId(id) });
};

module.exports.getPINsRespondedToTrainerSessions = id =>
  Response.find({ trainers: mongoose.Types.ObjectId(id) }, { PIN: 1, _id: 0 });

module.exports.getPINsRespondedToGroupSessions = id =>
  User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: 'responses',
        localField: 'trainersGroup',
        foreignField: 'trainers',
        as: 'trainersGroup',
      },
    },
    {
      $project: {
        PIN: '$trainersGroup.PIN',
      },
    },
  ]);
