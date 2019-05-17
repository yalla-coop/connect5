const mongoose = require('mongoose');

const Session = require('../../models/Session');
const Response = require('../../models/Response');

// sum of trainer sessions and atendees grouped by type
const getTrianerSessions = trainerId => {
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
              branches: [
                { case: { $eq: ['$type', '1'] }, then: 'Session 1' },
                { case: { $eq: ['$type', '2'] }, then: 'Session 2' },
                { case: { $eq: ['$type', '3'] }, then: 'Session 3' },
                {
                  case: { $eq: ['$type', 'special-2-days'] },
                  then: '2-day Intensive',
                },
                {
                  case: { $eq: ['$type', 'train-trainers'] },
                  then: 'Train trainers',
                },
              ],
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
              branches: [
                {
                  case: { $eq: ['$surveyType', 'pre-day-1'] },
                  then: 'Pre-course',
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-1'] },
                  then: 'Post Session 1',
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-2'] },
                  then: 'Post Session 2',
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-3'] },
                  then: 'Post Session 3',
                },
                {
                  case: { $eq: ['$surveyType', 'post-special'] },
                  then: 'Post 2-day Intensive',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-3-month'] },
                  then: '3 month follow-up',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-6-month'] },
                  then: '6 month Follow-up',
                },
              ],
              default: 'No match',
            },
          },
        },
        order: {
          $first: {
            $switch: {
              branches: [
                { case: { $eq: ['$surveyType', 'pre-day-1'] }, then: 1 },
                {
                  case: { $eq: ['$surveyType', 'post-day-1'] },
                  then: 2,
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-2'] },
                  then: 3,
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-3'] },
                  then: 4,
                },
                {
                  case: { $eq: ['$surveyType', 'post-special'] },
                  then: 'Post 2-day Intensive',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-3-month'] },
                  then: '3 month follow-up',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-6-month'] },
                  then: '6 month Follow-up',
                },
              ],
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

module.exports = { getTrianerSessions, getTrainerSuerveys };
