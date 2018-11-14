const express = require("express");
const router = express.Router();
// Load Trainer Model
const Trainer = require('../database/models/Trainer');
// Load Input Validation File
const validateRegisterTrainer = require('../validation/register-trainer');

// @route   POST /
// @desc    Register Trainer
// @access  Public
// send form via frontend getting request.body obj via body-parser
router.post('/', (req, res) => {
// destructuring of errors and isValid from validation file to check incoming request from frontend
const { errors, isValid } = validateRegisterTrainer(req.body);
console.log(req.body);


// Check Validation and if errors exist -> send those to server
if (!isValid) {
  return res.status(400).json(errors);
}

// check if email already exists
Trainer.findOne({ email: req.body.email }).then(trainer => {
  if (trainer) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  } else {
// mongoose syntax = new + modelName and then pass in data
const newTrainer = new Trainer({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  password: req.body.password
});
// save new trainer
// respond with object containing trainer info via mongoose api
newTrainer
.save()
.then(trainer => res.json(trainer))
.catch(err => console.log(err))
  }
 })
});

module.exports = router;

