const mongoose = require('mongoose');

const { sessionTypes, regions } = require('./../DBConstants');

const { Schema, model } = mongoose;

const regionsWithOther = [...regions, 'Other (please specify)'];

const sessionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: sessionTypes,
  },

  numberOfAttendees: Number,
  region: {
    type: String,
    enum: regionsWithOther,
  },
  // array of trainers must be 2 max
  trainers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  // list of participants emails
  participantsEmails: [String],
});

const Session = model('sessions', sessionSchema);
module.exports = Session;
