const mongoose = require("mongoose");
const Trainer = require("../server/database/models/Trainer");
const Session = require("../server/database/models/Session");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");

const dbConnection = require("../server/database/db_connection");
const buildDb = require("../server/database/dummy_data_build");

const getAllAnswers = require("./../server/database/queries/get_all_answers");

/**
 * Test for get_all_answers query
 * the query take no arguments and
 * returns all the answers in DB
 * joined the relevant question
 */
describe("Test for  get_all_answers", () => {
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
    await Question.deleteMany();
    await Response.deleteMany();
    await Answer.deleteMany();

    // Build the dummy data
    await buildDb();
  });

  // Test with everything ok
  test("Test with everything ok", async () => {
    await getAllAnswers()
      .then(async (response) => {
        expect(response).toBeDefined();
        expect(response.length).toBeGreaterThan(0);
      });
  });
});
