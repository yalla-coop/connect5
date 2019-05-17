const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const answerSchema = new Schema({
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
});

const Answer = model('answers', answerSchema);
module.exports = Answer;
