const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");


const Trainer = require("../../server/database/models/Trainer");
const Session = require("../../server/database/models/Session");

const dbConnection = require("./../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");
const loginTrainer = require("../../server/database/queries/login-trainer");


/**
 * Tests for "/session" with method "POST"
 * Which expected to create new session for the logged in trainer
 */

describe("Test  /session route", () => {
  afterAll(async () => {
    // Close the connection
    await mongoose.connection.close();
  });

  beforeAll(async () => {
    // connect to DB before the tests start
    dbConnection();

    // Drop the DB before the tests start
    await Session.deleteMany();
    await Trainer.deleteMany();

    // Build the dummy data
    await buildDb();
  });

  beforeEach(async () => {
    // Drop the DB before each test
    await Session.deleteMany();
    await Trainer.deleteMany();

    // Build the dummy data
    await buildDb();
  });

  test("Test with everything is Ok", async () => {
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // Session data to be stored
    const data = {
      sessionType: 2,
      startDate: "2018-12-01",
      inviteesNumber: 25,
    };

    const response = await request(app)
      .post("/session")
      .send(data)
      .set({ Authorization: token.token });

    expect(response.statusCode).toBe(200);
  });

  test("Test with unvalid data", async () => {
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // Session data to be stored
    const data = {
      sessionType: 2,
      startDate: "not a date format",
      inviteesNumber: 25,
    };
    const response = await request(app)
      .post("/session")
      .send(data)
      .set({ Authorization: token.token });

    expect(response.statusCode).toBe(400);
  });

  test("Test with not logged in trainer", async () => {
    // Session data to be stored
    const data = {
      sessionType: 2,
      startDate: "2018-12-01",
      inviteesNumber: 25,
    };
    const response = await request(app)
      .post("/session")
      .send(data)
      .set({ Authorization: "anything" });

    expect(response.statusCode).toBe(401);
  });
});
