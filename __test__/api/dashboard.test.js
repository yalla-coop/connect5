const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");

const loginTrainer = require("../../server/database/queries/login-trainer");

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

describe("Test for /dashboard route", () => {
  // test if dummy data builds correctly
  test("test if trainer login creates token", async () => {
    const result = await loginTrainer("johndoe@gmail.com", "123456", null);
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
});
