const Question = require("./../models/Question");

const getRadioStarQuestions = () => new Promise(async (resolve, reject) => {
  Question.aggregate([
    // filter the questions depending on the inputType
    { $match: { inputType: "radiostar" } },
    // grouping the questions depending on the questionText
    // and add a "questions" array contains the information for each one
    { $group: { _id: "$questionText", questions: { $push: "$$ROOT" } } },
  ])
    .then(resolve)
    .catch(reject);
});
module.exports = getRadioStarQuestions;
