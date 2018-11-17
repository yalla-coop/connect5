const mongoose = require("mongoose");
const mongoDB = require("../../config/keys").mongoURI;

// load models
const Trainer = require("./models/Trainer");
const Session = require("./models/Session");
const Response = require("./models/Response");
const Answer = require("./models/Answer");
const Question = require("./models/Question");

async function buildDb() {
  // connect to db
  mongoose.connect(
    mongoDB,
    { useNewUrlParser: true }
  );

  // clear collections

  await Trainer.deleteMany({});
  await Session.deleteMany({});
  await Response.deleteMany({});
  await Answer.deleteMany({});

  console.log("collections deleted");

  // insert trainer

  const trainer = new Trainer({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "123456"
  });

  await trainer.save();

  console.log("trainer added: ", await Trainer.find());

  // insert session for that trainer

  await Session.insertMany([
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
  ]);

  console.log("sessions added: ", await Session.find());

  // insert response for the first session

  const singleSession = await Session.findOne({
    date: new Date("2018-04-17")
  });

  await Response.insertMany([
    {
      session: singleSession._id,
      trainer: singleSession.trainer,
      participantId: "123"
    }
  ]);

  console.log("response added: ", await Response.find());

  // insert answers for that response

  const singleResponse = await Response.findOne({ participantId: "123" });
  const presurvey = await Question.find({ surveyType: 0 });
  const survey1 = await Question.find({ surveyType: 1 });

  // insert presurvey responses

  await Answer.insertMany([
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[0]._id,
      answer: "123"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[1]._id,
      answer: "North East"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[2]._id,
      answer: "E2 5TY"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[3]._id,
      answer: "Head of Testing"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[4]._id,
      answer: "Emergency services (including fire service, police, ambulance)"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[5]._id,
      answer: 2
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[6]._id,
      answer: 3
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[7]._id,
      answer: 1
    }
  ]);

  // insert survey 1 responses

  await Answer.insertMany([
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[0]._id,
      answer: "123"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[1]._id,
      answer: "North East"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[2]._id,
      answer: "E2 5TY"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[3]._id,
      answer: "Head of Testing"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[4]._id,
      answer: "Emergency services (including fire service, police, ambulance)"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[5]._id,
      answer: 3
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[6]._id,
      answer: 3
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[7]._id,
      answer: 3
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[8]._id,
      answer: [
        "Group discussion",
        "New learning around general mental health issues",
        "New learning around mental health approaches (e.g. 5 ways to wellbeing, 5 areas model)",
        "New skills to conduct meaningful mental health related conversations"
      ]
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[9]._id,
      answer: [
        "Moderate improvement (2)",
        "Small improvement (1)",
        "Greatly improved (5)",
        "Improved (3)",
        "Well improved (4)",
        "Improved (3)"
      ]
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[10]._id,
      answer: ["Fair", "Average", "Good", "Poor", "Excellent", "Good"]
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[11]._id,
      answer: "Yes"
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[12]._id,
      answer:
        "Random text here answering the question about how my work will change due to coming to this first session."
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[13]._id,
      answer:
        "Random text here answering the question about suggestions for how they can improve the course."
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: survey1[14]._id,
      answer:
        "Random text here answering the question about anything else I'd like to tell them about the session 1 training."
    }
  ]);

  console.log("survey answers added: ", await Answer.find());
}

// buildDb().catch(err => console.error(err.stack));

export default buildDb;

