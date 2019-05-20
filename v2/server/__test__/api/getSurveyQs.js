const mongoose = require('mongoose');
const request = require('supertest');

const buildDB = require('../../database/data/test/index');

const app = require('../../app');

const Session = require('../../database/models/Session');

beforeAll(async () => {
  // build dummy data
  await buildDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('test get survey questions route', () => {
  test('test for get survey questions route', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const sessionId = singleSession._id;

    request(app)
      .get(`/api/survey/${surveyType}&${sessionId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body.questionsForSurvey).toBeDefined();
        done(err);
      });
  });
  test("Test survey doesn't load if session doesn't exist", async () => {
    const response = await request(app).get('/api/survey/pre-day-1_0123456');
    expect(response.statusCode).toBe(500);
  });

  test('Test without params', async () => {
    const response = await request(app).get('/api/get/survey/');
    expect(response.statusCode).toBe(404);
  });
});
