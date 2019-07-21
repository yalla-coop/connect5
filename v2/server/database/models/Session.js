const mongoose = require('mongoose');

const { sessionTypes } = require('./../DBConstants');

const { Schema, model } = mongoose;

const sessionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: sessionTypes,
  },
  shortId: {
    type: String,
  },
  numberOfAttendees: Number,
  region: {
    type: String,
    lowercase: true,
  },
  address: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  // array of trainers must be 2 max
  trainers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  sentEmails: [
    {
      date: Date,
      trainer: String,
      sessionDate: Date,
      sessionType: String,
      location: String,
      trainers: String,
      recipients: [String],
    },
  ],
  // list of participants emails
  participantsEmails: [String],
});

const Session = model('sessions', sessionSchema);
module.exports = Session;
