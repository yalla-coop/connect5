const mongoose = require('mongoose');

const User = require('../../models/User');

const getLocalLeadsSessions = leadId => {
  return User.aggregate([
    {
      $match: {
        $or: [
          { _id: mongoose.Types.ObjectId(leadId) },
          { localLead: mongoose.Types.ObjectId(leadId) },
        ],
      },
    },
    {
      $lookup: {
        from: 'sessions',
        localField: '_id',
        foreignField: 'trainers',
        as: 'sessions',
      },
    },
    {
      $match: { sessions: { $exists: true, $ne: [] } },
    },
    {
      $unwind: '$sessions',
    },
    {
      $group: { _id: null, sessions: { $addToSet: '$sessions' } },
    },
    {
      $unwind: '$sessions',
    },
    {
      $replaceRoot: { newRoot: '$sessions' },
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

const getTeamLeadSuerveys = teamLeadId => {
  return User.aggregate([
    {
      $match: {
        $or: [
          { _id: mongoose.Types.ObjectId(teamLeadId) },
          { localLead: mongoose.Types.ObjectId(teamLeadId) },
        ],
      },
    },
    {
      $lookup: {
        from: 'responses',
        localField: '_id',
        foreignField: 'trainers',
        as: 'responses',
      },
    },
    {
      $match: { responses: { $exists: true, $ne: [] } },
    },
    {
      $unwind: '$responses',
    },
    {
      $group: { _id: null, resp: { $addToSet: '$responses' } },
    },
    {
      $unwind: '$resp',
    },
    {
      $replaceRoot: { newRoot: '$resp' },
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
      $group: {
        _id: '$surveyType',
        key: { $first: '$_id' },
        responses: { $sum: 1 },
        participants: { $first: { $sum: '$session.numberOfAttendees' } },
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
                  case: { $eq: ['$surveyType', 'pre-train-trainers'] },
                  then: 'Pre train trainers',
                },
                {
                  case: { $eq: ['$surveyType', 'post-train-trainers'] },
                  then: 'Post train trainers',
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
                {
                  case: { $eq: ['$surveyType', 'pre-day-1'] },
                  then: 1,
                },
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
                  case: { $eq: ['$surveyType', 'pre-train-trainers'] },
                  then: 5,
                },
                {
                  case: { $eq: ['$surveyType', 'post-train-trainers'] },
                  then: 6,
                },
                {
                  case: { $eq: ['$surveyType', 'post-special'] },
                  then: 7,
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-3-month'] },
                  then: 8,
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-6-month'] },
                  then: 9,
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
  ]);
};

module.exports = { getLocalLeadsSessions, getTeamLeadSuerveys };