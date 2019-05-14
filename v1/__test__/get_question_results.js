const mongoose = require("mongoose");
const dbConnection = require("./../server/database/db_connection");

const Question = require("../server/database/models/Question");
const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");

const getQuestionResults = require("./../server/database/queries/get_question_results");

// Connect to DB
dbConnection();

describe("getQuestionResults testing", async () => {
  // Drop all tables from DB before the tests
  beforeAll(async () => {
    await Question.deleteMany();
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();
  });

  // close DB connection at the end
  afterAll(() => {
    mongoose.connection.close();
  });


  test("standard test for 'getQuestionResults query'", async () => {
    // Default trainer data to be stored
    let trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Insert trainer into DB
    trainer = await trainer.save();

    let session1 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-01",
      invitees: 0,
      attendees: 0,
      surveyURL1: "URL1",
    });

    let session2 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-02",
      invitees: 0,
      attendees: 0,
      surveyURL1: "URL2",
    });

    session1 = await session1.save();
    session2 = await session2.save();

    let question1 = new Question({
      surveyType: 0,
      questionText: "questionText test1",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    let question2 = new Question({
      surveyType: 1,
      questionText: "questionText test2",
      inputType: "inputType test2",
      helperText: "helperText test2",
      options: [1, 2, 3, 4, 5, 6],
    });

    question1 = await question1.save();
    question2 = await question2.save();

    const response11 = new Response({
      session: session1._id,
      trainer: trainer._id,
    });

    const response12 = new Response({
      session: session1._id,
      trainer: trainer._id,
    });

    const response21 = new Response({
      session: session2._id,
      trainer: trainer._id,
    });

    const response22 = new Response({
      session: session2._id,
      trainer: trainer._id,
    });

    await response11.save();
    await response12.save();
    await response21.save();
    await response22.save();

    const answer111 = new Answer({
      response: response11._id,
      session: session1._id,
      question: question1._id,
      answer: "response1 session1 question1",
    });

    const answer112 = new Answer({
      response: response11._id,
      session: session1._id,
      question: question2._id,
      answer: "response1 session1 question2",
    });

    const answer121 = new Answer({
      response: response11._id,
      session: session2._id,
      question: question1._id,
      answer: "response1 session2 question1",
    });

    const answer122 = new Answer({
      response: response11._id,
      session: session2._id,
      question: question2._id,
      answer: "response1 session2 question2",
    });

    const answer222 = new Answer({
      response: response22._id,
      session: session2._id,
      question: question2._id,
      answer: "response2 session2 question2",
    });

    const answer211 = new Answer({
      response: response22._id,
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


    await getQuestionResults(question2._id, session1._id)
      .then((result) => {
        expect(result.length).toBe(1);
        expect(result[0].answer).toMatch(/question2/);
        expect(result[0].answer).toMatch(/session1/);
      });

    await getQuestionResults(question1._id, session1._id)
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result[0].answer).toMatch(/question1/);
        expect(result[0].answer).toMatch(/session1/);
      });

    await getQuestionResults(question1._id, session2._id)
      .then((result) => {
        expect(result.length).toBe(1);
        expect(result[0].answer).toMatch(/question1/);
        expect(result[0].answer).toMatch(/session2/);
      });

    await getQuestionResults(question2._id, session2._id)
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result[0].answer).toMatch(/question2/);
        expect(result[0].answer).toMatch(/session2/);
      });

    await getQuestionResults(question2._id, null)
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
