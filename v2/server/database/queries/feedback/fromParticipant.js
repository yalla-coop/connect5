const Question = require('../../models/Question');
const { questionConstants } = require('./../../DBConstants');

const trainerQuestionsGroup = questionConstants.groups.ABOUT_YOUR_TRAINER;
const feedBackFromParticipant = PIN =>
  Question.aggregate([
    {
      $match: {
        group: trainerQuestionsGroup,
      },
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
      $unwind: '$answer',
    },
    {
      $addFields: {
        answer: '$answer.answer',
      },
    },
    {
      $group: {
        _id: {
          code: '$code',
          text: '$text',
        },
        answers: {
          $push: { answer: '$answer', surveyType: '$surveyType', id: '$_id' },
        },
      },
    },
  ]);

module.exports = feedBackFromParticipant;
