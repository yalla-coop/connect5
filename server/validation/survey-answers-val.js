const Validator = require("validator");
const isEmpty = require("./is-empty");
const Questions = require("../database/models/Question");

const validateSurveyInput = async (data) => {
  // set up error obj to store errors
  const errors = {};

  // query the Question model using data.surveyType to get a list of the question ids for that survey which are required
  const questions = await Questions.find({ surveyType: data.surveyType, isRequired: true });
  // create array of question ids required
  const questionIDList = questions.map(e => e._id.toString());
  // create array of question ids for answers submitted
  const answers = Object.keys(data.formState);
  // filter questionIdArray to find unanswered questions and put them into error obj
  questionIDList.filter((e) => {
    if (answers.includes(e)) {
      errors[e] = "this question must be answered";
    }
  });

  console.log("Qs", questions);
  console.log("answers", answers);
  console.log("questionIDS", questionIDList);
  console.log("errors", errors);
};

module.exports = validateSurveyInput;
