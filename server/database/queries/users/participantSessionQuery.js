const Response = require('../../models/Response');

const getParticipantSessions = pin => {
  return Response.aggregate([
    { $match: { PIN: pin } },
    {
      $lookup: {
        from: 'sessions',
        localField: 'session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      $unwind: '$session',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'session.trainers',
        foreignField: '_id',
        as: 'trainers',
      },
    },
    {
      $project: {
        'trainers.email': 0,
        'trainers.password': 0,
        'trainers.role': 0,
        'trainers.trainersGroup': 0,
        'trainers.region': 0,
        'trainers.localLead': 0,
        'trainers.createdAt': 0,
        'trainers.updatedAt': 0,
        'trainers.__v': 0,
      },
    },
    {
      $group: {
        _id: { type: '$session.type', date: '$session.date' },
        sessions: { $first: '$session' },
        trainers: { $first: '$trainers' },
        PIN: { $first: '$PIN' },
        surveyType: { $push: '$surveyType' },
      },
    },
    {
      $sort: { 'sessions.date': -1 },
    },
  ]);
};

module.exports = getParticipantSessions;
