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


  test("Test for '/view-sessions' with a valid token", async () => {
    // get the token for the default trainer
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);

    // make "GET" request
    const response = await request(app)
      .get("/view-sessions")

      // set the token in the request header
      .set({ Authorization: token.token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].attendees).toBeDefined();
    expect(response.body[1].type).toBeDefined();
  });


  test("Test for '/view-sessions' without token", async () => {
    const response = await request(app)
      .get("/view-sessions");
    expect(response.status).toBe(401);
  });
});
