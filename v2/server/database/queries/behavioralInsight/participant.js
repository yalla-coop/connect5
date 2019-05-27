const Question = require('./../../models/Question');
const { questionConstants } = require('./../../DBConstants');

const behaviouralInsightsGroup = questionConstants.groups.BEHAVIOURAL;

module.exports = PIN => {
  return Question.aggregate([
    {
      $match: { group: behaviouralInsightsGroup },
    },
    {
      $lookup: {
        from: 'answers',
        let: { question: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$question', '$$question'] },
                  { $eq: ['$PIN', PIN] },
                ],
              },
            },
          },
        ],
        as: 'answer',
      },
    },
    {
      $project: {
        answer: {
          $arrayElemAt: ['$answer', 0],
        },
        code: 1,
        surveyType: 1,
      },
    },
    {
      $match: {
        answer: { $exists: true },
      },
    },
    {
      $project: {
        answer: '$answer.answer',
        code: 1,
        surveyType: 1,
      },
    },
    {
      $group: {
        _id: { code: '$code', surveyType: '$surveyType' },
        avg: { $avg: { $toInt: '$answer' } },
      },
    },
    {
      $group: {
        _id: '$_id.surveyType',
        answers: { $push: '$$ROOT' },
      },
    },
    {
      $unwind: '$answers',
    },
    {
      $project: {
        code: '$answers._id.code',
        avg: '$answers.avg',
      },
    },
    { $group: { _id: '$_id', answers: { $push: '$$ROOT' } } },
  ]);
};
