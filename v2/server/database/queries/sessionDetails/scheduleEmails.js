const mongoose = require('mongoose');
const Session = require('./../../models/Session');

module.exports.scheduleNewEmail = ({
  sessionId,
  surveyType,
  date,
  extraInformation,
  recipients,
}) =>
  Session.updateOne(
    { _id: sessionId },
    {
      $push: {
        scheduledEmails: { surveyType, date, extraInformation, recipients },
      },
    }
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

module.exports.removeScheduledEmail = ({ sessionId, scheduledEmailId }) =>
  Session.updateOne(
    { _id: sessionId },
    {
      $pull: {
        scheduledEmails: { _id: mongoose.Types.ObjectId(scheduledEmailId) },
      },
    }
  );

module.exports.removeEmailBySurveyType = ({ sessionId, surveyType }) =>
  Session.updateOne(
    { _id: sessionId },
    {
      $pull: {
        scheduledEmails: { surveyType },
      },
    }
  );
