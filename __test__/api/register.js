const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");

const Trainer = require("../../server/database/models/Trainer");
const dbConnection = require("../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");

describe("Test for /register route", () => {
  afterAll(async () => {
    // Drop the DB after all tests.
    await Trainer.deleteMany();
    // Build the dummy data
    await buildDb();
    // Close the connection
    await mongoose.connection.close();
  });
  beforeAll(async () => {
    // connect to DB before the tests start
    dbConnection();
    // Drop the DB before the tests start
    await Trainer.deleteMany();
    // Build the dummy data
    await buildDb();
  });
  // test client request sending empty object --> 400 Bad Request Error
  test("test for register unsuccessfully", async () => {
    // const trainer = await Trainer.findOne({ firstName: "John" });
    const trainer = {};
    const response = await request(app).post("/register", trainer);
    expect(response.statusCode).toBe(400);
  });
});

// const response = await request(app).get(`/session/details/${storedSession._id}/1`);
// expect(response.statusCode).toBe(200);
// expect(Array.isArray(response.body)).toBe(true);
// expect(response.body[0].questions).toBeDefined();
// expect(response.body[0].questions.length).toBe(15);
// expect(response.body[1].attendeesNumber).toBe(8);
// expect(response.body[2].reponsesNumber).toBe(1);