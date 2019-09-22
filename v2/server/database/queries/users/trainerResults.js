const mongoose = require('mongoose');

const Session = require('../../models/Session');
const Response = require('../../models/Response');
const {
  readableSessionNamePairs,
  readableSurveysNamePairs,
} = require('./../../../constants');

// sum of trainer sessions and atendees grouped by type
const getTrianerSessions = trainerId => {
  // array of branches
  // [ { case: { $eq: ['$type', '1'] }, then: 'Session 1' }, ... ]
  const branches = Object.entries(readableSessionNamePairs).map(pair => {
    return { case: { $eq: ['$type', pair[0]] }, then: pair[1] };
  });

  return Session.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $group: {
        _id: '$type',
        sessions: { $sum: 1 },
        participants: { $sum: '$numberOfAttendees' },
        key: { $first: '$_id' },
        type: {
          $first: {
            $switch: {
              branches,
              default: 'No match',
            },
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

// Trainer responses number grouped by survery type
const getTrainerSuerveys = trainerId => {
  // array of branches
  // { case: { $eq: ['$surveyType', 'post-day-1'] },    then: 'Post Session 1' },
  const branches = Object.entries(readableSurveysNamePairs).map(pair => {
    return {
      case: { $eq: ['$surveyType', pair[0]] },
      then: pair[1],
    };
  });

  // array of branches
  // { case: { $eq: ['$surveyType', 'post-day-1'] },    then: 1 },
  const orderedBranch = Object.entries(readableSurveysNamePairs).map(
    (pair, i) => {
      return {
        case: { $eq: ['$surveyType', pair[0]] },
        then: i + 1,
      };
    }
  );

  return Response.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $lookup: {
        from: 'sessions',
        localField: 'session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ['$session', 0] }, '$$ROOT'],
        },
      },
    },
    {
      $group: {
        _id: '$surveyType',
        key: { $first: '$_id' },
        responses: { $sum: 1 },
        participants: { $first: { $sum: '$numberOfAttendees' } },
        type: {
          $first: {
            $switch: {
              branches,
              default: 'No match',
            },
          },
        },
        order: {
          $first: {
            $switch: {
              branches: orderedBranch,
              default: 'No match',
            },
          },
        },
      },
    },
    {
      $sort: { order: 1 },
    },
    {
      $project: {
        _id: 1,
        key: 1,
        order: 1,
        type: 1,
        responses: 1,
        participants: 1,
        responseRate: {
          $multiply: [{ $divide: ['$responses', '$participants'] }, 100],
        },
      },
    },
  ]);
};

const getTrainerSessionCount = trainerId => {
  return Session.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $group: {
        _id: null,
        sessions: { $sum: 1 },
        participants: { $sum: '$numberOfAttendees' },
      },
    },
  ]);
};

const getTrainerResponseCount = trainerId => {
  return Response.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $group: {
        _id: null,
        responses: { $sum: 1 },
      },
    },
  ]);
};

module.exports = {
  getTrianerSessions,
  getTrainerSuerveys,
  getTrainerSessionCount,
  getTrainerResponseCount,
};
