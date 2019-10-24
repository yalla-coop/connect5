const User = require('../../models/User');
const {
  readableSessionNamePairs,
  readableSurveysNamePairs,
} = require('./../../../constants');

const getAdminSessions = () => {
  // array of branches
  // [ { case: { $eq: ['$type', '1'] }, then: 'Session 1' }, ... ]
  const branches = Object.entries(readableSessionNamePairs).map(pair => {
    return { case: { $eq: ['$type', pair[0]] }, then: pair[1] };
  });

  return User.aggregate([
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
        emails: { $push: '$participantsEmails' },
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

const getAdminSuerveys = () => {
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

  return User.aggregate([
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
  ]);
};

const getAllTrainers = async () => {
  const trainers = await User.aggregate([
    {
      $match: {
        role: 'trainer',
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
      $unwind: '$localLead',
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
  ]);

  return trainers;
};

const getAllLocalLeads = async () => {
  const trainers = await User.aggregate([
    {
      $match: {
        role: 'localLead',
      },
    },
    // {
    //   $lookup: {
    //     from: 'users',
    //     localField: 'localLead',
    //     foreignField: '_id',
    //     as: 'localLead',
    //   },
    // },
    // {
    //   $unwind: '$localLead',
    // },
    {
      $addFields: {
        trainerCount: { $size: '$trainersGroup' },
      },
    },
    {
      $project: {
        _id: 1,
        email: 1,
        trainerCount: 1,
        name: 1,
        region: 1,
        organization: 1,
        role: 1,
      },
    },
  ]);

  return trainers;
};

module.exports = {
  getAdminSessions,
  getAdminSuerveys,
  getAllTrainers,
  getAllLocalLeads,
};
