const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');

const { sessionTypes } = require('./../DBConstants');
const { surveyTypes } = require('./../DBConstants');

const { Schema, model } = mongoose;

const sessionSchema = new Schema(
  {
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
      postcode: String,
      addressLine1: String,
      addressLine2: String,
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
        sendDate: {
          type: Date,
          default: Date.now(),
        },
        trainer: String,
        sessionDate: String,
        sessionType: String,
        location: {
          location: String,
          addressLine1: String,
          addressLine2: String,
        },
        trainers: String,
        recipients: [String],
        startTime: String,
        endTime: String,
        type: {
          type: String,
          // registration === invitaion
          enum: ['reminder', 'intial', 'registration', 'surveyLink'],
        },
        preServeyLink: String,
        surveyURL: String,
      },
    ],
    // list of participants emails
    participantsEmails: [
      {
        _id: { type: mongoose.Types.ObjectId, auto: true },
        email: String,
        status: { type: String, enum: ['new', 'sent', 'confirmed'] },
      },
    ],
    scheduledEmails: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          auto: true,
        },
        date: {
          type: Date,
          default: moment.tz(moment(), 'Europe/London'),
        },
        surveyType: {
          type: String,
          enum: surveyTypes,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Session = model('sessions', sessionSchema);
module.exports = Session;
