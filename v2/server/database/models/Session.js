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
  // list of participants emails
  participantsEmails: [
    {
      _id: { type: mongoose.Types.ObjectId, auto: true },
      email: String,
      status: { Type: String, enum: ['new', 'sent', 'confirmed'] },
    },
  ],
});

const Session = model('sessions', sessionSchema);
module.exports = Session;
