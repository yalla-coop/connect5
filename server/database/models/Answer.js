const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Answer Schema
// Defines how we store all survey answers and relates each answer to a response_id, question_id and session_id

const AnswerSchema = new Schema({
  response: {
    // connect each answer to the exact response
    type: Schema.Types.ObjectId, //FK ref session_id
    ref: "responses"
  },
  session: {
    // connect each answer to the exact session
    type: Schema.Types.ObjectId, //FK ref session_id
    ref: "sessions"
  },
  question: {
    // connect each answer to the exact question
    type: Schema.Types.ObjectId, //FK ref question_id
    ref: "questions"
  },
  answer: {
    type: Mixed,
    required: true
  }
});

module.exports = Answer = mongoose.model("answers", AnswerSchema);
