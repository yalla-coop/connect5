const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");


const Trainer = require("../../server/database/models/Trainer");
const Session = require("../../server/database/models/Session");
const Response = require("../../server/database/models/Response");
const Answer = require("../../server/database/models/Answer");
const Question = require("../../server/database/models/Question");

const dbConnection = require("./../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");


/**
 * Tests for "/session/details/:sessionId/:sessionType"
 * Which expected to response with an array consist of
 * "Question" object and "attendeesNumber" as number.
 * and "responsesNumber" as number.
 */

describe("Test /session/details/:sessionId/:sessionType route", () => {
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

  test("Test for servey 1", async () => {
    const storedSession = await Session.findOne({ date: "2018-04-17" });
    const response = await request(app).get(`/session/details/${storedSession._id}/1`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].questions).toBeDefined();
    expect(response.body[0].questions.length).toBe(15);
    expect(response.body[1].attendeesNumber).toBe(8);
    expect(response.body[2].reponsesNumber).toBe(1);
  });

  test("test for pre-survey", async () => {
    const storedSession = await Session.findOne({ date: "2018-04-17" });
    const response = await request(app).get(`/session/details/${storedSession._id}/0`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].questions).toBeDefined();
    expect(response.body[0].questions.length).toBe(8);
    expect(response.body[1].attendeesNumber).toBe(8);
    expect(response.body[2].reponsesNumber).toBe(1);
  });

  test("test without sessionType param", async () => {
    const storedSession = await Session.findOne({ date: "2018-04-17" });
    const response = await request(app).get(`/session/details/${storedSession._id}/`);
    expect(response.statusCode).toBe(404);
  });

  test("test with not exist session id", async () => {
    const response = await request(app).get("/session/details/0123456789/0");
    expect(response.statusCode).toBe(500);
  });

  test("test without sessionId param", async (done) => {
    const response = await request(app).get("/session/details/");
    expect(response.statusCode).toBe(404);
    done();
  });
});

/**
 * Tests for "/session/responses/:sessionId/:sessionType"
 * Which expected to response with an array consist of
 * "Answers" object and "Questions" object.
 */
describe("Test  /session/responses/:sessionId/:sessionType route", () => {
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

  test("Test for servey 1", async () => {
    const storedSession = await Session.findOne({ date: "2018-04-17" });
    const response = await request(app).get(`/session/responses/${storedSession._id}/1`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].questions).toBeDefined();
    expect(response.body[1].answers).toBeDefined();

    expect(response.body[0].questions.length).toBe(15);
    expect(response.body[1].answers.length).toBe(23);
  });

  test("Test for pre-survey", async () => {
    const storedSession = await Session.findOne({ date: "2018-04-17" });
    const response = await request(app).get(`/session/responses/${storedSession._id}/0`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].questions).toBeDefined();
    expect(response.body[1].answers).toBeDefined();

    expect(response.body[0].questions.length).toBe(8);
    expect(response.body[1].answers.length).toBe(23);
  });

  test("Test not exist session id", async () => {
    const response = await request(app).get("/session/responses/0123456789/0");
    expect(response.statusCode).toBe(500);
  });

  test("Test without params", async () => {
    const response = await request(app).get("/session/responses/");
    expect(response.statusCode).toBe(404);
  });
});
