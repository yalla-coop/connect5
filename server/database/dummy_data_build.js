const mongoose = require("mongoose");
const mongoDB = require("../../config/keys").mongoURI;

// connect to db
mongoose.connect(mongoDB);

// load models
const Trainer = require("./models/Trainer");
const Session = require("./models/Session");
const Response = require("./models/Response");
const Answer = require("./models/Answer");

// clear database
// input Trainer
// input Sessions
// input Response
// input Answer

Trainer.deleteMany({})
  .then(Session.deleteMany({}))
  .then(Response.deleteMany({}))
  .then(Answer.deleteMany({}))
  .then(console.log("all collections successfully cleared"))
  .catch(err => console.log(err))
  .then(() => {
    // input Trainer
    const trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456"
    });

    trainer.save().then(trainer => {
      // user this trainer's id to input 2 sessions for that trainer
      Session.insertMany([
        {
          trainer: trainer._id,
          type: 1,
          date: "2018-04-17",
          invitees: 15,
          attendees: 8,
          surveyURL1: "connect5.com/presurvey",
          surveyURL2: "connect5.com/survey1"
        },
        {
          trainer: trainer._id,
          type: 2,
          date: "2018-08-22",
          invitees: 6,
          surveyURL1: "connect5.com/survey2"
        }
      ])
        .then(console.log("trainer and sessions now inserted"))
        .catch(err => console.log(err));
    });

    //   console.log("trainer added: ", trainer._id))
    // .catch(err => console.log(err));
  })

  .catch(err => console.log(err));
// .then(() => {
//   // input 2 sessions for that trainer
//   Session.insertMany([
//     {

//     }
//   ])
// })
