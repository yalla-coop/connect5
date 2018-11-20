/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
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

describe("addSession testing", async () => {
// reset "Trainer" & "Session" models before firdt test
  beforeAll(async () => {
    await Question.deleteMany();
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();
  });

  // reset "Trainer" & "Session" models after each test
  afterEach(async () => {
    await Question.deleteMany();
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();
  });

  // close DB connection
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

    let session_1 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-01",
      invitees: 0,
      attendees: 0,
      surveyURL1: "URL1",
    });

    let session_2 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-02",
      invitees: 0,
      attendees: 0,
      surveyURL1: "URL2",
    });

    session_1 = await session_1.save();
    session_2 = await session_2.save();

    let question_1 = new Question({
      surveyType: 0,
      questionText: "questionText test1",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    let question_2 = new Question({
      surveyType: 1,
      questionText: "questionText test2",
      inputType: "inputType test2",
      helperText: "helperText test2",
      options: [1, 2, 3, 4, 5, 6],
    });

    question_1 = await question_1.save();
    question_2 = await question_2.save();

    let response_1_1 = new Response({
      session: session_1._id,
      trainer: trainer._id,
    });

    let response_1_2 = new Response({
      session: session_1._id,
      trainer: trainer._id,
    });

    let response_2_1 = new Response({
      session: session_2._id,
      trainer: trainer._id,
    });

    let response_2_2 = new Response({
      session: session_2._id,
      trainer: trainer._id,
    });

    response_1_1 = await response_1_1.save();
    response_1_2 = await response_1_2.save();
    response_2_1 = await response_2_1.save();
    response_2_2 = await response_2_2.save();

    const answer_1_1_1 = new Answer({
      response: response_1_1._id,
      session: session_1._id,
      question: question_1._id,
      answer: "response1 session1 question1",
    });

    const answer_1_1_2 = new Answer({
      response: response_1_1._id,
      session: session_1._id,
      question: question_2._id,
      answer: "response1 session1 question2",
    });

    const answer_1_2_1 = new Answer({
      response: response_1_1._id,
      session: session_2._id,
      question: question_1._id,
      answer: "response1 session2 question1",
    });

    const answer_1_2_2 = new Answer({
      response: response_1_1._id,
      session: session_2._id,
      question: question_2._id,
      answer: "response1 session2 question2",
    });

    const answer_2_2_2 = new Answer({
      response: response_2_2._id,
      session: session_2._id,
      question: question_2._id,
      answer: "response2 session2 question2",
    });

    const answer_2_1_1 = new Answer({
      response: response_2_2._id,
      session: session_1._id,
      question: question_1._id,
      answer: "response2 session1 question1",
    });

    await answer_1_1_1.save();
    await answer_1_1_2.save();
    await answer_1_2_1.save();
    await answer_1_2_2.save();
    await answer_2_2_2.save();
    await answer_2_1_1.save();


    await getQuestionResults(question_2._id, session_1._id)
      .then((result) => {
        expect(result.length).toBe(1);
        expect(result[0].answer).toMatch(/question2/);
        expect(result[0].answer).toMatch(/session1/);
      });

    await getQuestionResults(question_1._id, session_1._id)
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result[0].answer).toMatch(/question1/);
        expect(result[0].answer).toMatch(/session1/);
      });

    await getQuestionResults(question_1._id, session_2._id)
      .then((result) => {
        expect(result.length).toBe(1);
        expect(result[0].answer).toMatch(/question1/);
        expect(result[0].answer).toMatch(/session2/);
      });

    await getQuestionResults(question_2._id, session_2._id)
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result[0].answer).toMatch(/question2/);
        expect(result[0].answer).toMatch(/session2/);
      });

    await getQuestionResults(question_2._id, null)
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
