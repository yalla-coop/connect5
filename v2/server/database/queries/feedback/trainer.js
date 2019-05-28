// gets feedback of all participants of one trainer
// gets all responses for 1 trainer
// gets all answers and questions for those responses
// groups answers by question
// counts duplicate answers related to question type
// outputs an array of objects
// [{questionText: [{answer1: {surveyType1: count, surveyType2: count}}, {answer2...}}]}, {questionText2...}...]

const mongoose = require('mongoose');
const Response = require('../../models/Response');

module.exports.trainerFeedback = async trainerId => {
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

    // count each answer related to survey type
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
