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

describe("Test for /login route", () => {
  // test if dummy data builds correctly
  test("test if dummy data trainer registers successfully", async () => {
    const trainer = await Trainer.findOne({ firstName: "John" });
    expect(trainer).toBeDefined();
  });

  // test client request sending empty object --> 400 Bad Request Error
  test("test to login sending empty obj", async () => {
    const trainer = {};
    const response = await request(app)
      .post("/login")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
  });

  // test client request sending wrong login details object --> 400 Bad Request Error
  test("test to login sending wrong details obj", async () => {
    const trainer = {
      email: "johndoe@gmail.com",
      password: "123466",
    };
    const response = await request(app)
      .post("/login")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
  });
  // test client request sending right login details object --> 200 success
  test("test to login sending right details obj", async () => {
    const trainer = {
      email: "johndoe@gmail.com",
      password: "123456",
    };
    const response = await request(app)
      .post("/login")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    // further test to be inserted after authentication setup
  });
});
