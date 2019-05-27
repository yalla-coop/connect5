const mongoose = require('mongoose');

const User = require('../../models/User');
const Session = require('../../models/Session');
const Response = require('../../models/Response');
const Answer = require('../../models/Answer');
const Question = require('../../models/Question');
// sum of trainer sessions and atendees grouped by type
const getTrianerSessions = trainerId => {
  return Session.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $group: {
        _id: '$type',
        sessions: { $sum: 1 },
        participants: { $sum: '$numberOfAttendees' },
        key: { $first: '$_id' },
        type: {
          $first: {
            $switch: {
              branches: [
                { case: { $eq: ['$type', '1'] }, then: 'Session 1' },
                { case: { $eq: ['$type', '2'] }, then: 'Session 2' },
                { case: { $eq: ['$type', '3'] }, then: 'Session 3' },
                {
                  case: { $eq: ['$type', 'special-2-days'] },
                  then: '2-day Intensive',
                },
                {
                  case: { $eq: ['$type', 'train-trainers'] },
                  then: 'Train trainers',
                },
              ],
              default: 'No match',
            },
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};

// Trainer responses number grouped by survery type
const getTrainerSuerveys = trainerId => {
  return Response.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $lookup: {
        from: 'sessions',
        localField: 'session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ['$session', 0] }, '$$ROOT'],
        },
      },
    },
    {
      $group: {
        _id: '$surveyType',
        key: { $first: '$_id' },
        responses: { $sum: 1 },
        participants: { $first: { $sum: '$numberOfAttendees' } },
        type: {
          $first: {
            $switch: {
              branches: [
                {
                  case: { $eq: ['$surveyType', 'pre-day-1'] },
                  then: 'Pre-course',
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-1'] },
                  then: 'Post Session 1',
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-2'] },
                  then: 'Post Session 2',
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-3'] },
                  then: 'Post Session 3',
                },
                {
                  case: { $eq: ['$surveyType', 'post-special'] },
                  then: 'Post 2-day Intensive',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-3-month'] },
                  then: '3 month follow-up',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-6-month'] },
                  then: '6 month Follow-up',
                },
              ],
              default: 'No match',
            },
          },
        },
        order: {
          $first: {
            $switch: {
              branches: [
                { case: { $eq: ['$surveyType', 'pre-day-1'] }, then: 1 },
                {
                  case: { $eq: ['$surveyType', 'post-day-1'] },
                  then: 2,
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-2'] },
                  then: 3,
                },
                {
                  case: { $eq: ['$surveyType', 'post-day-3'] },
                  then: 4,
                },
                {
                  case: { $eq: ['$surveyType', 'post-special'] },
                  then: 'Post 2-day Intensive',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-3-month'] },
                  then: '3 month follow-up',
                },
                {
                  case: { $eq: ['$surveyType', 'follow-up-6-month'] },
                  then: '6 month Follow-up',
                },
              ],
              default: 'No match',
            },
          },
        },
      },
    },
    {
      $sort: { order: 1 },
    },
    {
      $project: {
        _id: 1,
        key: 1,
        order: 1,
        type: 1,
        responses: 1,
        participants: 1,
        responseRate: {
          $multiply: [{ $divide: ['$responses', '$participants'] }, 100],
        },
      },
    },
  ]);
};

const getTrainerSessionCount = trainerId => {
  return Session.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $group: {
        _id: null,
        sessions: { $sum: 1 },
        participants: { $sum: '$numberOfAttendees' },
      },
    },
  ]);
};

const getTrainerResponseCount = trainerId => {
  return Response.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $group: {
        _id: null,
        responses: { $sum: 1 },
      },
    },
  ]);
};

// gets feedback of all participants of one trainer
const trainerFeedback = async trainerId => {
  const trainerFeedbackArr = await Response.aggregate([
    {
      $match: { trainers: mongoose.Types.ObjectId(trainerId) },
    },
    // get all answers for responses
    {
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'response',
        as: 'answers',
      },
    },
    {
      $project: {
        _id: 0,
        answers: 1,
        surveyType: 1,
      },
    },
    { $unwind: '$answers' },
    // get all questions for response answers
    {
      $lookup: {
        from: 'questions',
        localField: 'answers.question',
        foreignField: '_id',
        as: 'questions',
      },
    },
    { $unwind: '$questions' },
    {
      $match: { 'questions.group': 'about your trainer' },
    },
    {
      $project: {
        surveyType: 1,
        questionText: '$questions.text',
        answer: '$answers.answer',
      },
    },
  ]);
  // group array by question text
  let groupedByQuestion = trainerFeedbackArr.reduce((result, item) => {
    result[item.questionText] = result[item.questionText] || [];
    result[item.questionText].push(item);
    return result;
  }, {});

  groupedByQuestion = Object.entries(groupedByQuestion).map(e => e[1]);

  const listAnswers = groupedByQuestion.map(outerEl => {
    // console.log('element', outerEl);
    return outerEl.reduce((result, innerEl) => {
      result[innerEl.answer] = result[innerEl.answer] || [];
      result[innerEl.answer].push(
        `${innerEl.surveyType}/${innerEl.questionText}`
      );
      return result;
    }, {});
  });
  // console.log(listAnswers);

  const countAnswers = listAnswers.map((el, i) => {
    // Object.entries(el)[0][0]: el[Object.keys(el)[0]].length,

    const keys = el[Object.keys(el)[0]];
    const updateKeys = keys.map(el => el.split('/')[1]);

    return {
      [updateKeys[0]]: {
        [Object.entries(el)[0][0]]: el[Object.keys(el)[0]].length,
      },
    };
  });

  return countAnswers;
};

module.exports = {
  trainerFeedback,
  getTrianerSessions,
  getTrainerSuerveys,
  getTrainerSessionCount,
  getTrainerResponseCount,
};
// const countAnswers2 = array => {
//   const newArr = [];
//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     console.log('el', element);

//     for (let j = 0; j < element.length; j++) {
//       const item = element[j];
//       console.log('it', item.answer);
//     }
//   }
// };
