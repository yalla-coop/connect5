const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const { questionConstants } = require('./../DBConstants');

const ParticipantSchema = new Schema(
  {
    PIN: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    age: {
      type: String,
      enum: questionConstants.ages,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      lowercase: true,
    },
    ethnic: String,
    region: String,
    postcode: { type: String, lowercase: true },
    Session1Date: Date,
    occupation: { type: String, lowercase: true },
    workforce: { type: String, lowercase: true },
  },
  { timestamps: true }
);

const Participant = model('participants', ParticipantSchema);
module.exports = Participant;
