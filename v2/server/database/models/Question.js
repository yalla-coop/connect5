const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const { surveyTypes } = require('./../DBConstants');

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  code: String,
  // the general group
  // [ { text: "ABOUT YOU", order: 1 }, { text: "ABOUT YOUR TRAINER", order: 2 }]
  group: {
    text: String,
    order: Number,
  },

  // sub groups
  // ["Did your trainer ask questions...", "Did your trainer...", ...]
  subGroup: {
    text: String,
    order: Number,
    name: String,
  },
  surveyType: {
    type: String,
    enum: surveyTypes,
  },

  questionType: {
    desc: {
      type: String,
    },
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
  // question can contain multi helper text
  helperText: [String],
  options: [Schema.Types.Mixed],
  // "gender" "age" "region" ....
  participantField: String,
});

const Questions = model('questions', questionSchema);
module.exports = Questions;
