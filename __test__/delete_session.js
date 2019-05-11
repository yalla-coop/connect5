const mongoose = require("mongoose");
const dbConnection = require("./../server/database/db_connection");
const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const deteteSession = require("../server/database/queries/delete-session");

// Connect to DB
dbConnection();
describe("getQuestionResults testing", async () => {
  // Drop all tables from DB before the tests
  beforeAll(async () => {
    await Session.deleteMany();
    await Trainer.deleteMany();
  });

  // close DB connection at the end
  afterAll(() => {
    mongoose.connection.close();
  });

  test("testing with null value", async () => {
    // Default trainer data to be stored
    const trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Insert trainer into DB
    await trainer.save();

    // Session data to be stored with null session type
    const sessionType = null;
    const sessionDate = "2018-12-01";
    const sessionAttendees = 25;

    // Get trainer default data from DB
    await Trainer.findOne({
      email: "johndoe@gmail.com",
    }, "_id")
      .then(async (storedTrainer) => {
        // call "addSession" function to store session data into DB
        const session = new Session({
          trainer: storedTrainer._id,
          type: 1,
          date: "2018-04-17",
          invitees: 15,
          attendees: 8,
          surveyURL1: "0",
          surveyURL2: "1",
        });

        const storedSession = await session.save();
        await deteteSession(storedSession._id)
          .then(() => {
            Session.findById(storedSession._id)
              .then((res) => {
                expect(storedSession).toBeNull();
              });
          });
      });
  });
});
