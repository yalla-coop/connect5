const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
// Defines what kind of survey gets created: Pre(0), 1, 2 or 3

const QuestionSchema = new Schema({
  surveyType: {
    type: Number,
    required: true
  },

      questionText: {
        type: String,
        required: true
      },
      // checkbox, textfield, dropdown ..
      inputType: {
        type: String,
        required: true
      },
      helperText: {
        type: String
      },
      // options related to inputType
      options: {
        type: Array
      }
});

module.exports = Question = mongoose.model('questions', QuestionSchema);