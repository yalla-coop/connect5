const mongoose = require("mongoose");
const dbConnection = require("./../server/database/db_connection");

// load models
const Trainer = require("../server/database/models/Trainer");

// load queries
const exportDetails = require("../server/database/queries/export-results");

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

describe("Test getting all the results for the CSV export", () => {
  test("export results gets data correctly with trainerID", async () => {
    const trainer = await Trainer.findOne({ email: "johndoe@gmail.com" });

    const results = await exportDetails(trainer._id);
    expect(results).toBeDefined();
    expect(results[0].trainerName).toEqual("John Doe");
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(1);
  });

  test("incorrect ID throws a Mongo error", () => exportDetails("octopus").then((result) => {
    expect(result).toHaveLength(0);
  }).catch((err) => {
    expect(err).toBeTruthy();
    expect(err.name).toBe("CastError");
    expect(err.message).toBe("Cast to ObjectId failed for value \"octopus\" at path \"trainer\" for model \"responses\"");
  }));
});
