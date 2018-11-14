// Enter surveys here
const mongoose = require("mongoose");
const mongoDB = require("../../config/keys").mongoURI;

// connect to db
mongoose.connect(mongoDB);

// load models
const Question = require("./models/Question");

// input pre-survey
const preSurvey = new Question({
  // questions to go in here, one for each object
});

preSurvey
  .save()
  .then(preSurvey => console.log("preSurvey added: ", trainer))
  .catch(err => console.log(err));
