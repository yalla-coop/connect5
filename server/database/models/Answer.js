const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const answerSchema = new Schema({
  PIN: {
    type: String,
    required: true,
    uppercase: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
  },
  response: {
    type: Schema.Types.ObjectId,
    ref: 'responses',
  },
  answer: {
    type: String,
    required: true,
  },
  participant: {
    type: Schema.Types.ObjectId,
    ref: 'participants',
  },
});

const Answer = model('answers', answerSchema);
module.exports = Answer;
