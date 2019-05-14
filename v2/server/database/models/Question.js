const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const { surveyTypes } = require('./../DBConstants');

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  // the general group
  // [ "ABOUT YOU", "ABOUT YOUR TRAINER", "ABOUT YOUR USUAL WAY OF TEACHING"]
  group: String,

  // sub groups
  // ["Did your trainer ask questions...", "Did your trainer...", ...]
  subGroup: {
    text: String,
    order: Number,
  },
  surveyType: [
    {
      type: String,
      enum: surveyTypes,
    },
  ],
  questionType: {
    type: String,
    enum: ['radio', 'radioGroup', 'text'],
  },
  // question can contain multi helper text
  helperText: [String],
});

const Questions = model('questions', questionSchema);
module.exports = Questions;
