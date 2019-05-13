const mongoose = require("mongoose");
const dbConnection = require("../server/database/db_connection");

const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const Response = require("../server/database/models/Response");

const getSessionResponsesNumber = require("../server/database/queries/get_session_responses_number");

// Connect to DB
dbConnection();

describe("getSessionResponsesNumber testing", async () => {
// reset "Trainer", "Response" & "Session" models before first test
  beforeAll(async () => {
    await Session.deleteMany();
    await Trainer.deleteMany();
    await Response.deleteMany();
  });

  // close DB connection at the end
  afterAll(() => {
    mongoose.connection.close();
  });


  test("standard test for 'getSessionResponsesNumber query'", async () => {
    // Default trainer data to be stored
    let trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Insert trainer into DB
    trainer = await trainer.save();

    let session1 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-01",
      invitees: 0,
      attendees: 0,
      surveyURL1: "URL1",
    });

    let session2 = new Session({
      trainer: trainer._id,
      type: 0,
      date: "2018-12-02",
      invitees: 0,
      attendees: 0,
      surveyURL1: "URL2",
    });

    session1 = await session1.save();
    session2 = await session2.save();

    const response11 = new Response({
      session: session1._id,
      trainer: trainer._id,
    });

    const response12 = new Response({
      session: session1._id,
      trainer: trainer._id,
    });

    const response21 = new Response({
      session: session2._id,
      trainer: trainer._id,
    });


    await response11.save();
    await response12.save();
    await response21.save();


    await getSessionResponsesNumber(session1._id)
      .then((result) => {
        expect(result.reponsesNumber).toBe(2);
      });

    await getSessionResponsesNumber(session2._id)
      .then((result) => {
        expect(result.reponsesNumber).toBe(1);
      });

    await getSessionResponsesNumber(null)
      .catch((err) => {
        expect(err).toBeDefined();
      });
  });
});
