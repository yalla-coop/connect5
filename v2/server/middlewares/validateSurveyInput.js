const isEmpty = require('./isEmpty');
const Question = require('../database/models/Question');

// const Joi = require('joi');

// const surveyValid = {
//  surveyQuestions : Joi.object({
//    1:
//  })
// }

module.exports = async data => {
  // set up error obj to store errors
  const errors = {};

  // query the Question model using data.surveyType to get a list of the question ids for that survey which are required
  const questions = await Question.find({
    surveyType: data.surveyType,
    isRequired: true
  });

  // Postcode validation

  const postcodeQuestion = await Question.findOne({
    surveyType: data.surveyType,
    text: 'Please enter the postcode where you are active'
  });
  const postcodeQuestionId = postcodeQuestion._id.toString();

  const validPostcode = postcode => {
    postcode = postcode.replace(/\s/g, '');
    var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
  };

  // create array of question ids required
  const questionIDList = questions.map(e => e._id.toString());
  // create array of question ids for answers submitted
  const answers = Object.keys(data.formState);

  if (isEmpty(answers)) {
    questionIDList.forEach(e => (errors[e] = 'this question must be answered'));
  } else {
    questionIDList.filter(e => {
      if (!answers.includes(e)) {
        errors[e] = 'this question must be answered';
      }
    });
  }
  if (
    answers.includes(postcodeQuestionId) &&
    !validPostcode(data.formState[postcodeQuestionId])
  ) {
    errors[postcodeQuestionId] = 'enter a valid UK postcode';
  }

  console.log(
    'heyyy',
    answers.includes(postcodeQuestionId) &&
      !validPostcode(data.formState[postcodeQuestionId])
  );

  console.log(errors);

  return { errors };
};
