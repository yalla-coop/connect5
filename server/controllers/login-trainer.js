const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load Trainer Model
const Trainer = require('../database/models/Trainer');
// Load Input Validation File
const validateLoginInput = require('../validation/login-trainer-val');

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find trainer by email
  // check if
  Trainer.findOne({ email })
  .then(trainer => {
  if(!trainer) {
    errors.email = 'Trainer not found';
    return res.status(400).json(errors);
  }
  // password check (req vs. database)
  bcrypt.compare(password, trainer.password)
  .then(isMatch => {
    if(isMatch) {
      // trainer matched
     const payload = { id: trainer.id, name: trainer.name } // prepare for jwt
    } else {
      errors.password = 'Passwords incorrect'
      return res.status(400).json(errors);
    }
  });
 });
});