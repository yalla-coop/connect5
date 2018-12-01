const mongoose = require("mongoose");
const Session = require("../server/database/models/Session");
const Trainer = require("../server/database/models/Trainer");
const addSession = require("./../server/database/queries/add_session");
const dbConnection = require("./../server/database/db_connection");

// Connect to DB
dbConnection();

describe("addSession testing", async () => {
  // reset "Trainer" & "Session" models before firdt test
  beforeAll(async () => {
    await Trainer.remove({});
    await Session.remove({});
  });

  // reset "Trainer" & "Session" models after each test
  afterEach(async () => {
    await Trainer.remove({});
    await Session.remove({});
  });

  // close DB connection
  afterAll(async () => {
    await mongoose.connection.close();
  });


  test("standard test for 'addSession'", async () => {
    // Default trainer data to be stored
    const trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Insert trainer into DB
    await trainer.save();

    // Session data to be stored
    const trainerId = trainer._id;
    const sessionType = 2;
    const sessionDate = "2018-12-01";
    const sessionInvitees = 25;

    // call "addSession" function to store session data into DB
    await addSession(trainerId, sessionType, sessionDate, sessionInvitees);

    // Get "session" data from DB which insertrd before
    await Session.findOne({ trainer: trainerId })
      .then(async (storedSession) => {
        // stored session must equal session data declared above
        expect(storedSession.trainer).toEqual(trainerId);
        expect(storedSession.type).toBe(2);
        expect(storedSession.date).toEqual(new Date("2018-12-01"));
      });
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
    const trainerId = trainer._id;
    const sessionType = null;
    const sessionDate = "2018-12-01";
    const sessionInvitees = 25;


    // call "addSession" function to store session data into DB
    await addSession(trainerId, sessionType, sessionDate, sessionInvitees)
      .catch(async (err) => {
        // "addSession" must return error
        expect(err).toBeDefined();
      });

    // Get "session" data from DB which insertrd before
    await Session.findOne({ trainer: trainerId })
      .then(async (storedSession) => {
        // stored session must be null
        expect(storedSession).toBeNull();
      });
  });


  test("test with no 'Trainer' data", async () => {
    // Default trainer data to be stored
    const trainer = new Trainer({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Insert trainer into DB
    await trainer.save();

    // Session data to be stored
    const sessionType = 2;
    const sessionDate = "2018-12-01";
    const sessionInvitees = 25;

    // Call "addSession" with no "Trainer" table
    await addSession(null, sessionType, sessionDate, sessionInvitees)
      .catch(async (err) => {
        // "addSession" must return error
        expect(err).toBeDefined();
      });
  });
});
