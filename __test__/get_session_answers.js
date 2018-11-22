const mongoose = require("mongoose");
const dbConnection = require("../server/database/db_connection");

const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");
const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const Response = require("../server/database/models/Response");

const getSessionAnswers = require("../server/database/queries/get_session_answers");

// Connect to DB
dbConnection();

describe("getSessionAnswers testing", async () => {
// reset "DB models before first test
  beforeAll(async () => {
    await Question.deleteMany();
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();
  });

  // close DB connection
  afterAll(async () => {
    await mongoose.connection.close();
  });


  test("standard test for 'getSessionAnswers query'", async () => {
    let trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    trainer = await trainer.save();

    let session1 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-01",
      invitees: 5,
      attendees: 5,
      surveyURL1: "URL1",
    });

    let session2 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-02",
      invitees: 10,
      attendees: 10,
      surveyURL1: "URL2",
    });

    session1 = await session1.save();
    session2 = await session2.save();


    let response1 = new Response({
      session: session1._id,
      trainer: trainer._id,
    });


    let response2 = new Response({
      session: session2._id,
      trainer: trainer._id,
    });


    response1 = await response1.save();
    response2 = await response2.save();


    const question1 = new Question({
      surveyType: 0,
      questionText: "surveyType - 0",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question2 = new Question({
      surveyType: 0,
      questionText: "surveyType - 0",
      inputType: "inputType test2",
      helperText: "helperText test2",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question3 = new Question({
      surveyType: 0,
      questionText: "surveyType - 0",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question4 = new Question({
      surveyType: 1,
      questionText: "surveyType - 1",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question5 = new Question({
      surveyType: 1,
      questionText: "surveyType - 1",
      inputType: "inputType test2",
      helperText: "helperText test2",
      options: [1, 2, 3, 4, 5, 6],
    });

    await question1.save();
    await question2.save();
    await question3.save();
    await question4.save();
    await question5.save();


    const answer111 = new Answer({
      response: response1._id,
      session: session1._id,
      question: question1._id,
      answer: "response1 session1 question1",
    });

    const answer112 = new Answer({
      response: response1._id,
      session: session1._id,
      question: question2._id,
      answer: "response1 session1 question2",
    });

    const answer121 = new Answer({
      response: response1._id,
      session: session2._id,
      question: question1._id,
      answer: "response1 session2 question1",
    });

    const answer122 = new Answer({
      response: response1._id,
      session: session2._id,
      question: question2._id,
      answer: "response1 session2 question2",
    });

    const answer222 = new Answer({
      response: response2._id,
      session: session2._id,
      question: question2._id,
      answer: "response2 session2 question2",
    });

    const answer211 = new Answer({
      response: response2._id,
      session: session1._id,
      question: question1._id,
      answer: "response2 session1 question1",
    });

    await answer111.save();
    await answer112.save();
    await answer121.save();
    await answer122.save();
    await answer222.save();
    await answer211.save();

    await getSessionAnswers(session1._id)
      .then(({ answers }) => {
        expect(answers.length).toBe(3);
        expect(answers[0].answer).toMatch(/session1/);
        expect(answers[1].answer).toMatch(/session1/);
        expect(answers[2].answer).toMatch(/session1/);
      });

    await getSessionAnswers(session2._id)
      .then(({ answers }) => {
        expect(answers.length).toBe(3);
        expect(answers[0].answer).toMatch(/session2/);
        expect(answers[1].answer).toMatch(/session2/);
        expect(answers[2].answer).toMatch(/session2/);
      });

    await getSessionAnswers(null)
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
