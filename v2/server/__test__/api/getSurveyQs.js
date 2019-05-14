const mongoose = require('mongoose');
const request = require('supertest');

const dbConnection = require('../../database/dbConnection');

const buildDB = require('../../database/data/test/index');

const app = require('../../app');

const Session = require('../../database/models/Session');

describe('test get survey questions route', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test for get survey questions route', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;

    // const response = request(app).get(
    //   `/api/get/survey/${surveyType}${sessionId}`
    // );

    // console.log(response);

    request(app)
      .get(`/api/survey/${surveyType}${sessionId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res).toBe(0);
      });
  });
});
