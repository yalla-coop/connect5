const mongoose = require("mongoose");
const Trainer = require("../server/database/models/Trainer");
const Session = require("../server/database/models/Session");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");

const dbConnection = require("../server/database/db_connection");
const buildDb = require("../server/database/dummy_data_build");

const checkTrainerSession = require("./../server/database/queries/check_trainer_session");


/**
 * Test for check_trainer_session query
 * the query take trainerId and sessionId
 * as arguments and return true if the session
 * is belong that trainer or false otherwise
 */
describe("Test for  check_trainer_session", () => {
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
    const session = await Session.findOne({ trainer: trainer._id });

    const result = await checkTrainerSession(session._id, trainer._id);
    expect(result).toBe(true);
  });


  // Test with new trainer id
  test("Test with new trainer id", async () => {
    // create new trainer (he has no sessions yet)
    const trainer = new Trainer({
      firstName: "NotJohn",
      lastName: "NotDoe",
      email: "Notjohndoe@gmail.com",
      password: "Not123456",
    });
    await trainer.save();

    // get the new trainer data
    const newTrainer = await Trainer.findOne({ email: "Notjohndoe@gmail.com" });

    // get any session (must be not belong the new trainer)
    const session = await Session.find({});

    const result = await checkTrainerSession(session._id, newTrainer._id);
    expect(result).toBe(false);
  });
});
