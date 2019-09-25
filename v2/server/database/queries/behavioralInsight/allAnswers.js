const Question = require('./../../models/Question');
const { questionConstants } = require('./../../DBConstants');

const behaviouralInsightsGroup = questionConstants.groups.BEHAVIOURAL;

module.exports = async () => {
  const results = await Question.aggregate([
    {
      $match: { group: behaviouralInsightsGroup },
    },
    {
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'question',
        as: 'answers',
      },
    },
    {
      $unwind: { path: '$answers', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        answer: '$answers.answer',
        PIN: '$answers.PIN',
        code: 1,
        surveyType: 1,
      },
    },
  ]);
  const formedData = [];
  results.forEach(question => {
    const { PIN, answer, surveyType, code } = question;

    if (PIN) {
      if (formedData[PIN]) {
        if (formedData[PIN][surveyType]) {
          formedData[PIN][surveyType][code] = Number(answer);
        } else {
          formedData[PIN][surveyType] = {};
        }
      } else {
        formedData[PIN] = {};
      }
    }
  });

  return Object.values(formedData);
};
