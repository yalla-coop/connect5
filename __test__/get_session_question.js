const mongoose = require("mongoose");
const dbConnection = require("./../server/database/db_connection");

const Question = require("../server/database/models/Question");
const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const Response = require("../server/database/models/Response");

const getSessionQuestions = require("./../server/database/queries/get_session_questions");

// Connect to DB
dbConnection();

describe("getSessionQuestions testing", async () => {
// reset "DB models before first test
  beforeAll(async () => {
    await Question.deleteMany();
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Response.deleteMany();
  });

  // close DB connection
  afterAll(() => {
    mongoose.connection.close();
  });


  test("standard test for 'getSessionQuestions query'", async () => {
    const question1 = new Question({
      surveyType: 0,
      questionText: "surveyType - 0",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question2 = new Question({
      surveyType: 0,
      questionText: "surveyType - 0",
      inputType: "inputType test2",
      helperText: "helperText test2",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question3 = new Question({
      surveyType: 0,
      questionText: "surveyType - 0",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question4 = new Question({
      surveyType: 1,
      questionText: "surveyType - 1",
      inputType: "inputType test1",
      helperText: "helperText test1",
      options: [1, 2, 3, 4, 5, 6],
    });

    const question5 = new Question({
      surveyType: 1,
      questionText: "surveyType - 1",
      inputType: "inputType test2",
      helperText: "helperText test2",
      options: [1, 2, 3, 4, 5, 6],
    });

    await question1.save();
    await question2.save();
    await question3.save();
    await question4.save();
    await question5.save();

    await getSessionQuestions(0)
      .then((result) => {
        expect(result.questions.length).toBe(3);
        expect(result.questions[0].questionText).toBe("surveyType - 0");
      });

    await getSessionQuestions(1)
      .then((result) => {
        console.log("RESULT", result)
        expect(result.questions.length).toBe(2);
        expect(result.questions[0].questionText).toBe("surveyType - 1");
      });

    await getSessionQuestions(null)
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
