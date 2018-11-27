const Validator = require("validator");
const isEmpty = require("./is-empty");
const Questions = require("../database/models/Question");

const validateSurveyInput = async (data) => {
  // set up error obj to store errors
  const errors = {};

  // query the Question model using data.surveyType to get a list of the question ids for that survey which are required
  const questions = await Questions.find({ surveyType: 1, isRequired: true });

  console.log("Qs", questions);

  // loop through our answers and match against the question ids from our Question model

  // if any are missing, add them to the errors object

  // loop through the answer object
};

module.exports = validateSurveyInput;
