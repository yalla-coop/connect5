const Session = require('./../../models/Session');

module.exports.scheduleNewEmail = ({ sessionId, surveyType, date }) =>
  Session.updateOne(
    { _id: sessionId },
    { $push: { scheduledEmails: { surveyType, date } } }
  );

module.exports.getScheduledEmails = () =>
  Session.aggregate([
    { $match: { 'scheduledEmails.date': { $lte: new Date() } } },
    {
      $lookup: {
        from: 'users',
        localField: 'trainers',
        foreignField: '_id',
        as: 'trainers',
      },
    },
    { $unwind: '$scheduledEmails' },
    { $match: { 'scheduledEmails.date': { $lte: new Date() } } },
  ]);
