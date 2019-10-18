const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const specialRequirementSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: 'sessions',
    },
  },
  {
    timestamps: true,
  }
);

const Answer = model('specialRequirements', specialRequirementSchema);
module.exports = Answer;
