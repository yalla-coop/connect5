const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const { surveyTypes } = require('./../DBConstants');

const responseSchema = new Schema({
  // Respondent PIN
  PIN: {
    type: String,
    required: true,
  },

  //  list of trainers who led the session max 2
  trainers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  surveyType: {
    type: String,
    enum: surveyTypes,
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'sessions',
  },
  agreedToResearch: {
    type: Boolean,
    default: true,
  },
});

const Response = model('responses', responseSchema);
module.exports = Response;
