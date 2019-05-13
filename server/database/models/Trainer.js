const { Schema, model } = require("mongoose");

// Create Schema
// Creates a new trainer so they can log in and use the app

const TrainerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Trainer = model("trainers", TrainerSchema);
module.exports = Trainer;
