const mongoose = require('mongoose');

const User = require('../../models/User');
const Session = require('../../models/Session');

const getTrainerGroupSessions = async leadId => {
  const user = await User.findById(leadId);
  const trainers = user.trainersGroup;

  // get all the sessions that include at least one trainer in the group
  const sessions = await Promise.all(
    trainers.map(async trainerId =>
      Session.aggregate([
        { $match: { trainers: mongoose.Types.ObjectId(trainerId) } },
        {
          $project: {
            _id: 1,
            numberOfAttendees: 1,
            type: 1,
          },
        },
      ])
    )
  );

  const cleanedSessions = sessions.reduce((a, b) => a.concat(b), []);

  const uniqueSessions = [];
  const map = new Map();

  if (cleanedSessions.length > 0) {
    for (const item of cleanedSessions) {
      if (!map.has(item._id.toString())) {
        map.set(item._id.toString(), true);
        uniqueSessions.push({
          _id: item._id,
          numberOfAttendees: item.numberOfAttendees,
          type: item.type,
        });
      }
    }
  }

  const result = {
    '1': { _id: '1', sessions: 0, participants: 0, type: 'Session 1' },
    '2': { _id: '2', sessions: 0, participants: 0, type: 'Session 2' },
    '3': { _id: '3', sessions: 0, participants: 0, type: 'Session 3' },
    'special-2-days': {
      _id: 'special-2-days',
      sessions: 0,
      participants: 0,
      type: '2-day intensive',
    },
    'train-trainers': {
      _id: 'train-trainers',
      sessions: 0,
      participants: 0,
      type: 'Train trainers',
    },
  };

  uniqueSessions.map(session => {
    result[session.type]._id = session.type;
    result[session.type].sessions += 1;
    result[session.type].participants += session.numberOfAttendees;
  });

  return Object.values(result);
};

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

const getMyTrainers = async leadId => {
  const userDetails = await User.findById(leadId);

  if (userDetails.trainersGroup.length > 0) {
    const trainers = await Promise.all(
      // map through the trainerGroup array to look up each trainer
      userDetails.trainersGroup.map(async trainerId =>
        User.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(trainerId),
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'localLead',
              foreignField: '_id',
              as: 'localLead',
            },
          },
          {
            $unwind: { path: '$localLead', preserveNullAndEmptyArrays: true },
          },
          {
            $addFields: {
              localLeadName: '$localLead.name',
            },
          },
          {
            $project: {
              _id: 1,
              email: 1,
              localLeadName: 1,
              name: 1,
              region: 1,
              organization: 1,
              role: 1,
            },
          },
        ])
      )
    );

    console.log('hey;', trainers);

    return trainers;
  }

  return [];
};

module.exports = {
  getLocalLeadsSessions,
  getTeamLeadSuerveys,
  getMyTrainers,
  getTrainerGroupSessions,
};
