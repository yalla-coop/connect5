const mongoose = require("mongoose");
const dbConnection = require("./../server/database/db_connection");
const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const editSessionQurery = require("../server/database/queries/edit_session");

// Connect to DB
describe(" testing edit session", async () => {
  afterAll(async () => {
    // Drop the DB after all tests.
    await Session.deleteMany();
    await Trainer.deleteMany();

    // Build the dummy data
    // Close the connection
    await mongoose.connection.close();
  });
  beforeAll(async () => {
    // connect to DB before the tests start
    dbConnection();
    // Drop the DB before the tests start
    await Session.deleteMany();
    await Trainer.deleteMany();

    // Build the dummy data
  });
  beforeEach(async () => {
    // Drop the DB before each test
    await Session.deleteMany();
    await Trainer.deleteMany();

    // Build the dummy data
  });

  test("testing with null value", async (done) => {
    // Default trainer data to be stored
    const trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Insert trainer into DB
    await trainer.save();


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

        await editSessionQurery(1, "2018-03-5", 40, storedSession._id)
          .then(() => {
            Session.findById(storedSession._id)
              .then((res) => {
                expect(res.attendees).toBe(40);
                expect(res.type).toBe(1);
                expect(res.date).toEqual(new Date("2018-03-5"));
                done();
              }).catch((err) => {
                console.log(err);
              });
          });
      });
  });
});
