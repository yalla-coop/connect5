const mongoose = require('mongoose');
const request = require('supertest');

const buildDB = require('../../database/data/test/index');

const app = require('../../app');

const Session = require('../../database/models/Session');

describe('test get survey questions route', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test for get survey questions route', async done => {
    const surveyType = 'pre-day-1';
    const singleSession = await Session.findOne({ type: '1' });
    const { shortId } = singleSession;
    request(app)
      .get(`/api/survey/${surveyType}&${shortId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body.questionsForSurvey).toBeDefined();
        done(err);
      });
  });
  test("Test survey doesn't load if session doesn't exist", async done => {
    const response = await request(app).get('/api/survey/pre-day-1_0123456');
    expect(response.statusCode).toBe(500);
    done();
  });

  test('Test without params', async done => {
    const response = await request(app).get('/api/get/survey/');
    expect(response.statusCode).toBe(404);
    done();
  });
});
