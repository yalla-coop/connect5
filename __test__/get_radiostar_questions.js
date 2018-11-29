const mongoose = require("mongoose");
const Trainer = require("../server/database/models/Trainer");
const Session = require("../server/database/models/Session");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");

const dbConnection = require("../server/database/db_connection");
const buildDb = require("../server/database/dummy_data_build");

const getRadiostarQuestions = require("./../server/database/queries/get_radiostar_questions");

/**
 * Test for get_radiostar_questions query
 * the query take no arguments and
 * returns all the radiostar questions
 * grouped by the question text
 * and each question will have an array
 * of the same question across the sessions
 */
describe("Test for  'get_radiostar_questions' query", () => {
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
    await getRadiostarQuestions()
      .then(async (response) => {
        // we have 3 questions with radiostar type in each session
        expect(response.length).toBe(3);

        expect(response[0].questions).toBeDefined();

        // each question will have "questions" array
        // with 4 questions one for each session pre, 1, 2, 3
        expect(response[0].questions.length).toBe(4);

        // the question text must be equal with all "questions"
        // array elements
        expect(response[0].questions[0].questionText).toBe(response[0]._id);
      });
  });
});
