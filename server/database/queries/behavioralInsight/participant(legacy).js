const Question = require('./../../models/Question');
const { questionConstants } = require('./../../DBConstants');

const behaviouralInsightsGroup = questionConstants.groups.BEHAVIOURAL;

module.exports = async PIN => {
  const results = await Question.aggregate([
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
  ]);
  const formedData = [];
  results.forEach(question => {
    const { answer, surveyType, code } = question;

    if (formedData[surveyType]) {
      formedData[surveyType][code] = Number(answer);
    } else {
      formedData[surveyType] = {};
    }
  });
  return formedData;
};
