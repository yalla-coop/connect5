const mongoose = require("mongoose");
const Trainer = require("../server/database/models/Trainer");
const Session = require("../server/database/models/Session");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");

const dbConnection = require("../server/database/db_connection");
const buildDb = require("../server/database/dummy_data_build");

const getTrainerResponses = require("./../server/database/queries/get_trainer_responses");


/**
 * Test for get_trainer_responses query
 * the query take trainerId as argument
 * and return an array with the responses number
 * for sessions that the trainer has led
 * grouped by session type
 */
describe("Test for  get_trainer_responses", () => {
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


  // Test with everything ok
  test("Test for default trainer", async () => {
    const trainer = await Trainer.findOne({ email: "johndoe@gmail.com" });

    await getTrainerResponses(trainer._id)
      .then(async ({ responses }) => {
        expect(responses.length).toBe(2);
        expect(responses[0].sum).toBe(1);
        expect(responses[1].sum).toBe(1);
      });
  });


  // Test with not existent trainer Id
  test("Test with not existent trainer Id ", async () => {
    await getTrainerResponses("123456789")
      .then(async ({ responses }) => {
        expect(responses).toBeNull();
      })
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
