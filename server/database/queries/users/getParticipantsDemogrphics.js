const Participant = require('./../../models/Participant');
const { regions, questionConstants } = require('./../../DBConstants');

const getParticipantsDemogrphics = () =>
  Participant.aggregate([
    {
      $match: {
        region: { $exists: true },
        gender: { $exists: true },
        age: { $exists: true },
        ethnic: { $exists: true },
      },
    },
    {
      $facet: {
        total: [
          {
            $group: {
              _id: null,
              total: {
                $sum: 1,
              },
            },
          },
        ],
        region: [
          {
            $match: {
              region: { $in: regions },
            },
          },
          {
            $group: {
              _id: '$region',
              sum: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              sum: -1,
            },
          },
        ],
        gender: [
          {
            $match: {
              gender: { $in: ['male', 'female', 'other'] },
            },
          },
          {
            $group: {
              _id: '$gender',
              sum: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              sum: -1,
            },
          },
        ],
        age: [
          {
            $match: {
              age: { $in: questionConstants.ages },
            },
          },
          {
            $group: {
              _id: '$age',
              sum: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              sum: -1,
            },
          },
        ],
        ethnic: [
          {
            $match: {
              ethnic: { $in: questionConstants.ethnics },
            },
          },
          {
            $group: {
              _id: '$ethnic',
              sum: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              sum: -1,
            },
          },
        ],
        occupation: [
          {
            $group: {
              _id: '$occupation',
              sum: {
                $sum: 1,
              },
              totalCount: { $sum: 1 },
            },
          },
          {
            $sort: {
              sum: -1,
            },
          },
          {
            $limit: 7,
          },
        ],
      },
    },
  ]);

module.exports = getParticipantsDemogrphics;
