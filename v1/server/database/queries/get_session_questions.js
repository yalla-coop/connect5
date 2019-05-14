const Question = require("./../models/Question");

const getSessionQuestions = sessionType => new Promise((resolve, reject) => {
  Question.find({ surveyType: sessionType })
    .then(questions => resolve({ questions }))
    .catch(reject);
});
module.exports = getSessionQuestions;
