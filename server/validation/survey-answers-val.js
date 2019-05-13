/* eslint-disable */
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

  if (isEmpty(answers)) {
    questionIDList.forEach(e => (errors[e] = "this question must be answered"));
  } else {
    questionIDList.filter((e) => {
      if (!answers.includes(e)) {
        errors[e] = "this question must be answered";
      }
    });
  }

  // filter questionIdArray to find unanswered questions and put them into error obj

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateSurveyInput;
