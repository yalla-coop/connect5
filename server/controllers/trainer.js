const express = require("express");

const router = express.Router();

// Load Trainer Model
const Trainer = require('../database/models/Trainer');


router.get("/", (req, res) => {
  console.log("trainer reached");
  res.send("<h1>trainer</h1>");
});

// @route   POST /register
// @desc    Register Trainer
// @access  Public
// send form via frontend getting request.body obj via body-parser

router.post('/register', (req, res) => {

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
});

module.exports = router;

