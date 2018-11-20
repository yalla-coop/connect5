const Supertest = require("supertest");
const app = require("../server/controllers/index");

const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/connect5db_TEST";

// load models
const Trainer = require("../server/database/models/Trainer");
const Session = require("../server/database/models/Session");
const Response = require("../server/database/models/Response");
const Answer = require("../server/database/models/Answer");
const Question = require("../server/database/models/Question");

// load queries
const surveyQs = require("../server/database/queries/surveyQuestions")

// load the dummy data
const buildDb = require("../server/database/dummy_data_build");

// connect
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

describe("Test getting survey questions", () => {
  beforeAll(async () => {
    // clear collections before all tests
    await Trainer.deleteMany({});
    await Session.deleteMany({});
    await Response.deleteMany({});
    await Answer.deleteMany({});
  });
  afterEach(async () => {
    // clear collections after each test
    await Trainer.deleteMany({});
    await Session.deleteMany({});
    await Response.deleteMany({});
    await Answer.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("successully creates the collections", async () => {
    // build the database with the dummy data
    await buildDb().catch(err => console.error(err.stack));

    expect(Trainer).toBeDefined();
    expect(Session).toBeDefined();
    expect(Response).toBeDefined();
    expect(Answer).toBeDefined();

    const foundTrainer = await Trainer.findOne({ email: "johndoe@gmail.com" });
    const expected = "johndoe@gmail.com";
    const actual = foundTrainer.email;
    expect(actual).toEqual(expected);
    expect(typeof foundTrainer.email).toBe("string");

    expect(await Trainer.count("_id")).toEqual(1);
    expect(await Session.count("_id")).toEqual(2);
    expect(await Response.count("_id")).toEqual(1);
    expect(await Answer.count()).toBeGreaterThan(1);
  });

  it("getSurveyQs returns the right survey questions", async () => {
    // build the database with the dummy data
    await buildDb().catch(err => console.error(err.stack));

    const surveyId = 1;
    const singleSession = await Session.findOne({
        date: new Date("2018-04-17"),
      });

    const sessionId = singleSession._id;

    const survey = await surveyQs(surveyId, sessionId);

    expect(survey).toBeDefined();
    expect(survey.sessionDate).toEqual("17-04-2018");
    

  });

  it("check getSurveyQs error handling", async () => {
    // build the database with the dummy data
    await buildDb().catch(err => console.error(err.stack));

    const surveyId = 1;
    const sessionId = '42343254353413413443545';

    await surveyQs(surveyId, sessionId).catch(err => expect(err).toBeDefined());

  });

});
