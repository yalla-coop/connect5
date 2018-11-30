const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");


const Trainer = require("../../server/database/models/Trainer");
const Session = require("../../server/database/models/Session");
const Response = require("../../server/database/models/Response");
const Answer = require("../../server/database/models/Answer");
const Question = require("../../server/database/models/Question");
const loginTrainer = require("../../server/database/queries/login-trainer");

const dbConnection = require("./../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");


describe("Test '/trainer/overview' route", () => {
  afterAll(async () => {
    // Drop the DB after all tests.
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Question.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();

    // Build the dummy data
    await buildDb();

    // Close the connection
    await mongoose.connection.close();
  });

  beforeAll(async () => {
    // connect to DB before the tests start
    dbConnection();

    // Drop the DB before the tests start
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Question.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();

    // Build the dummy data
    await buildDb();
  });

  beforeEach(async () => {
    // Drop the DB before each test
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Question.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();

    // Build the dummy data
    await buildDb();
  });


  /**
   * Tests for '/trainer/overview'
   * which expect to be accessed by a trainers only
   * and expected to response with an array consist of
   * "attendees" array and "responses" as array.
   */

  test("Test for '/trainer/overview' with a valid token", async () => {
    // get the token for the default trainer
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // make "GET" request
    const response = await request(app)
      .get("/trainer/overview")

      // set the token in the request header
      .set({ Authorization: token.token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].attendees).toBeDefined();
    expect(response.body[1].responses).toBeDefined();
  });


  test("Test for '/trainer/overview' without token", async () => {
    const response = await request(app)
      .get("/trainer/overview");
    expect(response.status).toBe(401);
  });


  /**
   * Tests for /question/radiostart/all
   * which expect to be accessed by a trainers only
   * and expected to response with an array of questions
   */

  test("Test for '/question/radiostart/all' with a valid token", async () => {
    // get the token for the default trainer
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // make "GET" request
    const response = await request(app)
      .get("/question/radiostart/all")

      // set the token in the request header
      .set({ Authorization: token.token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    // we have 3 questions with radiostar type
    expect(response.body.length).toBe(3);

    expect(response.body[0]._id).toBe(response.body[0].questions[0].questionText);
  });


  test("Test for '/question/radiostart/all' with a unvalid token", async () => {
    // make "GET" request
    const response = await request(app)
      .get("/question/radiostart/all");

    expect(response.status).toBe(401);
  });


  /**
   * Tests for '/question/overview/results
   * which expect to be accessed by a trainers only
   * and expected to take an array of questionIds
   * for the same question a cross all surveys
   * and expect to response with an array of answers
   * of the question grouped by survey type
   */

  test("Test for '/question/overview/results' with a valid token", async () => {
    // get the token for the default trainer
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    const question = await Question.find({ inputType: "radiostar", surveyType: 0 });
    const questionsIDs = [question[0]._id, question[1]._id, question[2]._id];

    // make "GET" request
    const response = await request(app)
      .post("/question/overview/results")

      // set the token in the request header
      .set({ Authorization: token.token })
      .send({ questionsIDs });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].length).toBe(3);
  });


  test("Test for '/question/overview/results' with a valid token and questionId array", async () => {
    // get the token for the default trainer
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // get radiostar questions Ids for pre-survey
    const question = await Question.find({ inputType: "radiostar", surveyType: 0 });
    const questionsIDs = [question[0]._id, question[1]._id, question[2]._id];

    // make "POST" request
    const response = await request(app)
      .post("/question/overview/results")

      // set the token in the request header
      .set({ Authorization: token.token })
      .send({ questionsIDs });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].length).toBe(3);
  });


  test("Test for '/question/overview/results' with unvalid token and  questionId array", async () => {
    // get radiostar questions Ids for pre-survey
    const question = await Question.find({ inputType: "radiostar", surveyType: 0 });
    const questionsIDs = [question[0]._id, question[1]._id, question[2]._id];

    // make "POST" request
    const response = await request(app)
      .post("/question/overview/results")

      // set the token in the request header
      .send({ questionsIDs });

    expect(response.status).toBe(401);
  });


  test("Test for '/question/overview/results' with a valid token and without questionId array", async () => {
    // get the token for the default trainer
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // make "POST" request
    const response = await request(app)
      .post("/question/overview/results")

      // set the token in the request header
      .set({ Authorization: token.token })
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].length).toBe(0);
    expect(response.body[1].length).toBe(0);
    expect(response.body[2].length).toBe(0);
  });
});
