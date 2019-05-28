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
// gets all responses for 1 trainer
// gets all answers and questions for those responses
// groups answers by question
// counts duplicate answers related to question type
// outputs an array of objects
// [{questionText: [{answer1: {surveyType1: count, surveyType2: count}}, {answer2...}}]}, {questionText2...}...]
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
    // // get all questions for response answers
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
  // {questionTxt: [{surveyType, questionTxt, answer}]}

  let groupedByQuestion = trainerFeedbackArr.reduce((acc, cur) => {
    acc[cur.questionText] = acc[cur.questionText] || [];
    acc[cur.questionText].push(cur);
    return acc;
  }, {});

  // create array without question keys
  // [{surveyType, question, answer}...]
  groupedByQuestion = Object.entries(groupedByQuestion).map(e => e[1]);

  // group array by answer
  // [{answer1: [surveyType/question...]}, {answer2: [surveyType/question...]}..]
  const listAnswers = groupedByQuestion.map(outerEl => {
    // outerEl - array of answers related to 1 question
    return outerEl.reduce((acc, cur) => {
      acc[cur.answer] = acc[cur.answer] || [];
      acc[cur.answer].push(`${cur.surveyType}/${cur.questionText}`);
      return acc;
    }, {});
  });

  // count occurence of answers per survey type related to 1 question
  const countAnswers = listAnswers.map(answersGroup => {
    // answersGroup is a group of answersGroup related to same question
    // get value
    // answersGroup: key(answer) : value(surveyType/questionText)
    const value = answersGroup[Object.keys(answersGroup)[0]];
    // get questionText out of value
    const questionText = value.map(stringVal => stringVal.split('/')[1]);
    // get all answers
    const answersArr = [Object.entries(answersGroup)][0].map(answer => answer);

    const counter = answersArr.map(answer => {
      const surveyAnswerCounter = answer[1].reduce((acc, cur) => {
        const surveyType = cur.split('/')[0];
        acc[surveyType] = (acc[surveyType] || 0) + 1;
        return acc;
      }, {});

      // create second inner Obj { answerText: { surveyType: answerCount}}
      const counterOutput = {
        [answer[0]]: surveyAnswerCounter,
      };

      return counterOutput;
    });

    // create final array
    const finalObj = {
      [questionText[0]]: counter,
    };
    return finalObj;
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
