const mongoose = require("mongoose");
const dbConnection = require("../server/database/db_connection");

const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");

const getQuestionResults = require("../server/database/queries/get_session_attendees_number");

// Connect to DB
dbConnection();

describe("getQuestionResults testing", async () => {
// reset "Trainer" & "Session" models before first test
  beforeAll(async () => {
    await Session.deleteMany();
    await Trainer.deleteMany();
  });

  // close DB connection
  afterAll(() => {
    mongoose.connection.close();
  });


  test("standard test for 'getSessionAttendeesNumber' query'", async () => {
    let trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    trainer = await trainer.save();

    let session1 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-01",
      invitees: 5,
      attendees: 5,
      surveyURL1: "URL1",
    });

    let session2 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-02",
      invitees: 10,
      attendees: 10,
      surveyURL1: "URL2",
    });

    session1 = await session1.save();
    session2 = await session2.save();

    await getQuestionResults(session1._id)
      .then((result) => {
        expect(result.attendeesNumber).toBe(5);
      });

    await getQuestionResults(session2._id)
      .then((result) => {
        expect(result.attendeesNumber).toBe(10);
      });
    await getQuestionResults(null)
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
