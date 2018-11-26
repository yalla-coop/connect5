const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");

const Trainer = require("../../server/database/models/Trainer");
const dbConnection = require("../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");

dbConnection();

beforeEach(async () => {
  await buildDb().catch(err => console.log(err));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test for /register route", () => {
  // test if dummy data builds correctly
  test("test if dummy data trainer registers successfully", async () => {
    const trainer = await Trainer.findOne({ firstName: "John" });
    expect(trainer).toBeDefined();
  });

  // test client request sending empty object --> 400 Bad Request Error
  test("test for register unsuccessfully sending empty obj", async () => {
    const trainer = {};
    const response = await request(app)
      .post("/register")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
  });

  // test client request sending 'wrong' object --> 400 Bad Request Error
  test("test for register unsuccessfully sending extra fields", async () => {
    const trainer = {
      firstName: "Tester",
      lastName: "Jones",
      email: "tester@tester.com",
      password: "abcdef",
      password2: "abcdef",
      company: "testUS",
    };

    const response = await request(app)
      .post("/register")
      .send(trainer)
      .set("Accept", "application/json");
    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.company).toBeUndefined();
  });

  // test client request sending successful object --> 200 success
  test("test for register unsuccessfully", async () => {
    const trainer = {
      firstName: "Tester",
      lastName: "Jones",
      email: "tester@tester.com",
      password: "abcdef",
      password2: "abcdef",
    };
    const response = await request(app)
      .post("/register")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.firstName).toBe("Tester");
  });
});
