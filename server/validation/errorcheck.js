// function to check for errors
// Check Validation and if errors exist -> send those to server
// destructuring of errors and isValid from validation file to check incoming request from frontend
const validateRegisterTrainer = require('./register-trainer-val');
const errorcheck = (object) => {
  const { errors, isValid } = validateRegisterTrainer(object);
  if (!isValid) {
    console.log('submit errors: ', errors);

    return errors;
  }
}

module.exports = errorcheck;