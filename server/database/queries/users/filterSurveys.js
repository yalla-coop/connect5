const mongoose = require('mongoose');
const Response = require('./../../models/Response');

const { readableSurveysNamePairs } = require('./../../../constants');

module.exports = async filters => {
  const {
    // comes from filters
    gender,
    age,
    ethnic,
    region,
    workforce,
    trainer,
    manager,
    sessionType,
    surveyType,
  } = filters;

  const ageMatch = age ? { $in: ['$age', age] } : true;
  const genderMatch = gender ? { $in: ['$gender', [gender]] } : true;
  const ethnicMatch = ethnic ? { $in: ['$ethnic', ethnic] } : true;
  const regionMatch = region ? { $in: ['$region', region] } : true;
  const workforceMatch = workforce ? { $in: ['$workforce', workforce] } : true;

  const sessionTypeMatch = sessionType
    ? { $in: ['$sessionType', sessionType] }
    : true;

  const surveyTypeMatch = surveyType
    ? { $in: ['$surveyType', surveyType] }
    : true;

  const filteredResultsMatch = {
    $expr: {
      $and: [
        ageMatch,
        genderMatch,
        ethnicMatch,
        regionMatch,
        workforceMatch,
        sessionTypeMatch,
        surveyTypeMatch,
      ],
    },
  };

  if (trainer) {
    filteredResultsMatch.trainers = {
      $in: trainer.map(_trainerId => mongoose.Types.ObjectId(_trainerId)),
    };
  }

  if (manager) {
    filteredResultsMatch.managers = {
      $in: manager.map(_managerId => mongoose.Types.ObjectId(_managerId)),
    };
  }

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
      // join reponses with sessions
      $lookup: {
        from: 'sessions',
        localField: 'session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      // join reponses with participant
      $lookup: {
        from: 'participants',
        localField: 'participant',
        foreignField: '_id',
        as: 'participant',
      },
    },
    {
      $addFields: {
        answer: '$answer.answer',
        participant: {
          $arrayElemAt: ['$participant._id', 0],
        },
        PIN: {
          $arrayElemAt: ['$participant.PIN', 0],
        },
        age: {
          $arrayElemAt: ['$participant.age', 0],
        },
        gender: {
          $arrayElemAt: ['$participant.gender', 0],
        },
        ethnic: {
          $arrayElemAt: ['$participant.ethnic', 0],
        },
        region: {
          $arrayElemAt: ['$participant.region', 0],
        },
        workforce: {
          $arrayElemAt: ['$participant.workforce', 0],
        },
        managers: {
          $arrayElemAt: ['$session.canAccessResults', 0],
        },
        sessionType: {
          $arrayElemAt: ['$session.type', 0],
        },
        trainers: {
          $arrayElemAt: ['$session.trainers', 0],
        },
        sessionId: {
          $arrayElemAt: ['$session._id', 0],
        },
      },
    },

    {
      // filter the responses, returns all responses if there are no filters
      $match: filteredResultsMatch,
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
