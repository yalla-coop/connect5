const mongoose = require("mongoose");
const dbConnection = require("./../server/database/db_connection");

// load models
const Trainer = require("../server/database/models/Trainer");
const Session = require("../server/database/models/Session");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");

// load queries
const surveyQs = require("../server/database/queries/surveyQuestions");
const storeResponse = require("../server/database/queries/storeResponse");
const storeAnswers = require("../server/database/queries/storeAnswers");

// dummy data
const buildDb = require("../server/database/dummy_data_build");

// connect
dbConnection();

beforeEach(async () => {
  await buildDb().catch(err => console.error(err.stack));
  console.log("DB BUILT");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test getting survey questions", () => {
  test("successully creates the collections", async () => {
    expect(Trainer).toBeDefined();
    expect(Session).toBeDefined();
    expect(Response).toBeDefined();
    expect(Answer).toBeDefined();

    const foundTrainer = await Trainer.findOne({ email: "johndoe@gmail.com" });
    const expected = "johndoe@gmail.com";
    const actual = foundTrainer.email;
    expect(actual).toEqual(expected);
    expect(typeof foundTrainer.email).toBe("string");
  });

  test("getSurveyQs returns the right survey questions", async () => {
    const surveyId = 1;
    const singleSession = await Session.findOne({
      date: new Date("2018-04-17"),
    });

    const sessionId = singleSession._id;

    const survey = await surveyQs(surveyId, sessionId);

    expect(survey).toBeDefined();
    expect(survey.sessionDate).toEqual("17-04-2018");
  });

  test("check getSurveyQs error handling", async () => {
    const surveyId = 1;
    const sessionId = "42343254353413413443545";

    await surveyQs(surveyId, sessionId).catch(err => expect(err).toBeDefined());
  });
});

describe("Test storing answers in database", () => {
  test("storeResponse successfully stores answers and response in models", async () => {
    const surveyType = 1;
    const singleSession = await Session.findOne({
      date: new Date("2018-04-17"),
    });

    const sessionId = singleSession._id;
    const response = await storeResponse(sessionId, surveyType);

    console.log("RESPONSE", response);

    expect(response.session).toBe(sessionId);

    const dummyAnswers = {
      "5bf3f05e24be507739c5fcaf": "Yes",
      "5bf3f05e24be507739c5fcac": [
        "New learning around mental health approaches (e.g. 5 ways to wellbeing, 5 areas model)",
        "New skills to conduct meaningful mental health related conversations",
      ],
      "5bf3f05e24be507739c5fcab": 3,
    };

    const storedAnswers = await storeAnswers(response._id, dummyAnswers, sessionId);

    expect(storedAnswers).toBeDefined();
  });
});
