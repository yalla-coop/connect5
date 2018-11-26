const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");

const Trainer = require("../../server/database/models/Trainer");
const dbConnection = require("../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");

dbConnection();
beforeEach(async () => {
  await buildDb().catch(err => console.log(err));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test for /register route", () => {
  // afterAll(async () => {
  //   // Drop the DB after all tests.
  //   await Trainer.deleteMany();
  //   // Build the dummy data
  //   await buildDb();
  //   // Close the connection
  //   await mongoose.connection.close();
  // });
  // beforeAll(async () => {
  //   // connect to DB before the tests start
  //   dbConnection();
  //   // Drop the DB before the tests start
  //   await Trainer.deleteMany();
  //   // Build the dummy data
  //   await buildDb();
  // });

  // beforeEach(async () => {
  //   await
  // })

  // test if dummy data builds correctly
  test("test if dummy data trainer registers successfully", async () => {
    const trainer = await Trainer.findOne({ firstName: "John" });
    expect(trainer).toBeDefined();
  });

  // test client request sending empty object --> 400 Bad Request Error
  test("test for register unsuccessfully sending empty obj", async () => {
    const trainer = {};
    const response = await request(app)
      .post("/register")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
  });

  // test client request sending 'wrong' object --> 400 Bad Request Error
  test("test for register unsuccessfully sending extra fields", async () => {
    const trainer = {
      firstName: "Tester",
      lastName: "Jones",
      email: "tester@tester.com",
      password: "abcdef",
      password2: "abcdef",
      company: "testUS",
    };

    const response = await request(app)
      .post("/register")
      .send(trainer)
      .set("Accept", "application/json");
    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.company).toBeUndefined();
  });

  // test client request sending successful object --> 200 success
  test("test for register unsuccessfully", async () => {
    const trainer = {
      firstName: "Tester",
      lastName: "Jones",
      email: "tester@tester.com",
      password: "abcdef",
      password2: "abcdef",
    };
    const response = await request(app)
      .post("/register")
      .send(trainer)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.firstName).toBe("Tester");
  });
});

// describe('POST /user', function() {
//   it('user.name should be an case-insensitive match for "john"', function(done) {
//     request(app)
//       .post('/user')
//       .send('name=john') // x-www-form-urlencoded upload
//       .set('Accept', 'application/json')
//       .expect(function(res) {
//         res.body.id = 'some fixed id';
//         res.body.name = res.body.name.toLowerCase();
//       })
//       .expect(200, {
//         id: 'some fixed id',
//         name: 'john'
//       }, done);
//   });
// });

// test client request sending

// const response = await request(app).get(`/session/details/${storedSession._id}/1`);
// expect(response.statusCode).toBe(200);
// expect(Array.isArray(response.body)).toBe(true);
// expect(response.body[0].questions).toBeDefined();
// expect(response.body[0].questions.length).toBe(15);
// expect(response.body[1].attendeesNumber).toBe(8);
// expect(response.body[2].reponsesNumber).toBe(1);
