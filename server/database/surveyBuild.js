// Enter surveys here
const mongoose = require("mongoose");
const mongoDB = require("../../config/keys").mongoURI;

// connect to db
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

// load model
const Question = require("./models/Question");

// input pre-survey
// drop tables before running the script
// insert question array of objects

Question.deleteMany({})
  .then(console.log("db successfully deleted"))
  .catch(err => console.log(err))
  .then(
    Question.insertMany([
      // Pre-survey questions
      {
        surveyType: 0,
        questionText: "Please provide the name of your trainer",
        inputType: "textarea"
      },
      {
        surveyType: 0,
        questionText: "Please select the region",
        inputType: "radio",
        helperText: "",
        options: ["North East", "North West", "London"]
      }

      // Survey 1 questions
    ])
  )
  .then(console.log("successfully inserted"))
  .catch(err => console.log(err));
