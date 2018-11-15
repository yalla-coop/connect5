const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const SessionSchema = new Schema({
  trainer: {
    // connect each session to a trainer
    type: Schema.Types.ObjectId, //FK ref trainer_id
    ref: "trainers"
  },
  type: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  invitees: {
    type: Number
  },
  attendees: {
    type: Number
  },
  surveyURL1: {
    type: String,
    required: true
  },
  surveyURL2: {
    type: String
  }
});

// variable = Session, name = sessions, schema = SessionSchema

module.exports = Session = mongoose.model("sessions", SessionSchema);
