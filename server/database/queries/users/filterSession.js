const mongoose = require('mongoose');
const Session = require('../../models/Session');

const { readableSessionNamePairs } = require('../../../constants');

module.exports = filters => {
  const {
    // comes from filters
    trainer,
    manager,
    sessionType,
    surveyType,
  } = filters;

  const sessionTypeMatch = sessionType
    ? { $in: ['$sessionType', sessionType] }
    : true;

  const surveyTypeMatch = surveyType
    ? { $in: ['$surveyType', surveyType] }
    : true;

  const filteredResultsMatch = {
    $expr: {
      $and: [sessionTypeMatch, surveyTypeMatch],
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
  // [ { case: { $eq: ['$type', '1'] }, then: 'Session 1' }, ... ]
  const branches = Object.entries(readableSessionNamePairs).map(pair => {
    return { case: { $eq: ['$type', pair[0]] }, then: pair[1] };
  });

  return Session.aggregate([
    {
      $addFields: {
        managers: '$canAccessResults',
        sessionType: '$type',
        trainers: '$trainers',
      },
    },
    {
      $match: filteredResultsMatch,
    },
    {
      $group: {
        _id: '$sessionType',
        sessions: { $sum: 1 },
        key: { $first: '$_id' },
        participants: { $sum: '$numberOfAttendees' },
        emails: { $push: '$participantsEmails' },
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
  ]);
};
