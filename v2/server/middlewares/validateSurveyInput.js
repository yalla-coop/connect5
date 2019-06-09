const isEmpty = require('./isEmpty');
const Question = require('../database/models/Question');

module.exports = async data => {
  // set up error obj to store errors
  const errors = {};

  // query the Question model using data.surveyType to get a list of the question ids for that survey which are required
  const questions = await Question.find({
    surveyType: data.surveyType,
    isRequired: true,
  });

  // Postcode validation

  const postcodeQuestion = await Question.findOne({
    surveyType: data.surveyType,
    text: 'Please enter the postcode where you are active',
  });

  const validPostcode = postcode => {
    postcode = postcode.replace(/\s/g, '');

    const regex = /^(?:gir(?: *0aa)?|[a-pr-uwyz](?:[a-hk-y]?[0-9]+|[0-9][a-hjkstuw]|[a-hk-y][0-9][abehmnprv-y])(?: *[0-9][abd-hjlnp-uw-z]{2})?)$/gim;
    return regex.test(postcode);
  };

  // PIN validation
  const validLetters = string => {
    const regex = /[a-z]{1,3}/gim;
    return regex.test(string);
  };

  const validNumbers = string => {
    const regex = /^[0-9]{1,2}$/gim;
    return regex.test(string);
  };

  // create array of question ids required
  const questionIDList = questions.map(e => e._id.toString());
  // create array of question ids for answers submitted
  const answers = Object.keys(data.formState);
  const PIN = data.PIN.toString();

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
    postcodeQuestion &&
    answers.includes(postcodeQuestion._id.toString()) &&
    !validPostcode(data.formState[postcodeQuestion._id.toString()])
  ) {
    errors[postcodeQuestion._id.toString()] = 'enter a valid UK postcode';
  }
  if (
    PIN.length === 0 ||
    !(validLetters(PIN.substring(0, 3)) && validNumbers(PIN.substring(3, 5)))
  ) {
    errors.PIN = 'enter valid PIN';
  }

  return { errors, isValid: isEmpty(errors) };
};
