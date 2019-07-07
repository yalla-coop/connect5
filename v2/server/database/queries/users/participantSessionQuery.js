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
      $group: {
        _id: { type: '$session.type', date: '$session.date' },
        sessions: { $first: '$session' },
        PIN: { $first: '$PIN' },
      },
    },
    {
      $sort: { 'sessions.date': -1 },
    },
  ]);
};

module.exports = getParticipantSessions;
