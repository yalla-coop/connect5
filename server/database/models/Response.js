const { Schema, model } = require("mongoose");

// Response Schema
// Defines how we store all survey responses giving us a unique id that
// we can link all the answers in the answer model to the right overall survey response

const ResponseSchema = new Schema({
  session: {
    // connect each response to the exact session
    type: Schema.Types.ObjectId, // FK ref trainer_id
    ref: "sessions",
  },
  trainer: {
    // connect each response to a trainer
    type: Schema.Types.ObjectId, // FK ref trainer_id
    ref: "trainers",
  },
  participantId: {
    type: String,
  },
  surveyType: {
    type: Number,
  },
});

// variable = Response, name = responses, schema = ResponseSchema
const Response = model("responses", ResponseSchema);
module.exports = Response;
