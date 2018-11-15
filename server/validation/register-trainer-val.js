const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  // set up error obj to be populated with errors and returned
  let errors = {};

  // check if input is empty/ undefined etc and set it to an empty string
  // to be tested with Validators isEmpty function which only accepts empty strings
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // set up validation rules using Validator
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First name must be between 2 and 30 characters';
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors) // if no errors --> true --> valid
  };
};
