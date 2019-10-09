const Question = require('./../../models/Question');
const { questionConstants } = require('./../../DBConstants');

const behaviouralInsightsGroup = questionConstants.groups.BEHAVIOURAL;

module.exports = PINs => {
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
                  { $in: ['$PIN', PINs] },
                ],
              },
            },
          },
        ],
        as: 'answers',
      },
    },
    {
      $unwind: '$answers',
    },
    {
      $project: {
        PIN: '$answers.PIN',
        code: 1,
        answer: '$answers.answer',
      },
    },
    {
      $group: {
        _id: '$PIN',
        answers: {
          $push: '$$ROOT',
        },
      },
    },
  ]);
};
