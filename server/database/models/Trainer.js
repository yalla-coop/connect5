const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TrainerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Trainer = mongoose.model("trainers", TrainerSchema);
