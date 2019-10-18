const mongoose = require('mongoose');
const Response = require('./../../models/Response');

module.exports.getAllResponsesOnSurvey = (sessionId, surveyType) => {
  return Response.aggregate([
    {
      $match: {
        session: mongoose.Types.ObjectId(sessionId),
        surveyType,
      },
    },
    {
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'response',
        as: 'answers',
      },
    },
    {
      $unwind: '$answers',
    },
    {
      $lookup: {
        from: 'questions',
        localField: 'answers.question',
        foreignField: '_id',
        as: 'question',
      },
    },
    {
      $project: {
        PIN: 1,
        answer: '$answers.answer',
        question: { $arrayElemAt: ['$question', 0] },
      },
    },
    {
      $project: {
        PIN: 1,
        answer: 1,
        questionText: '$question.text',
        questionType: '$question.questionType.desc',
      },
    },
    {
      $group: {
        _id: '$_id',
        PIN: { $first: '$PIN' },
        data: { $push: '$$ROOT' },
      },
    },
  ]);
};
