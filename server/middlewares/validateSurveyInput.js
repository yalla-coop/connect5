const isEmpty = require('./isEmpty');

module.exports = async data => {
  // set up error obj to store errors
  const errors = {};

  // get all required questions for that survey
  const { questionsForParticipant } = data;

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
  const questionIDList = questionsForParticipant.map(e => e._id.toString());
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
    PIN.length === 0 ||
    !(validLetters(PIN.substring(0, 3)) && validNumbers(PIN.substring(3, 5)))
  ) {
    errors.PIN = 'enter valid PIN';
  }

  return { errors, isValid: isEmpty(errors) };
};
