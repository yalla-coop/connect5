const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Answer Schema
// Defines what kind of survey response comes back and relates each answer to a question_id and session_id

const AnswerSchema = new Schema({
  session: {
    // connect each survey response to the exact session
    type: Schema.Types.ObjectId, //FK ref session_id
    ref: 'sessions'
  },
  question: {
    // connect each survey response to the exact question
    type: Schema.Types.ObjectId, //FK ref question_id
    ref: 'questions'
  },
  answer: {
    type: Mixed,
    required: true
  }
});

module.exports = Answer = mongoose.model('answers', AnswerSchema);