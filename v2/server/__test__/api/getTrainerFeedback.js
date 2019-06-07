const request = require('supertest');
const mongoose = require('mongoose');
const User = require('./../../database/models/User');
const Session = require('./../../database/models/Session');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for getTrainerFeedback route', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test('test with valid trainer id', async done => {
    const trainers = await User.find({ role: 'trainer' });
    // const session = await Session.find({ type: 2, trainers: trainers[0] });

    request(app)
      .post(`/api/feedback/trainer/${trainers[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body[0].counter[0].surveyTypes.length).toBe(2);
        expect(result.body[0]).toBeDefined();
        done();
      });
  });

  test('test with valid trainer and session id', async done => {
    const trainers = await User.find({ role: 'trainer' });
    const sessions = await Session.find({ type: 2, trainers: trainers[0] });
    const data = { sessionId: sessions[0]._id };
    request(app)
      .post(`/api/feedback/trainer/${trainers[0]._id}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body[0].counter[0].surveyTypes.length).toBe(1);
        expect(result.body[0]).toBeDefined();
        done();
      });
  });

  test('test with invalid trainer id', async done => {
    request(app)
      .get(`/api/feedback/trainer/noId`)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        expect(err).toBeDefined();
        done();
      });
  });

  test('test with valid trainer id and invalid session id', async done => {
    const trainers = await User.find({ role: 'trainer' });
    const data = { sessionId: 'anything' };

    request(app)
      .get(`/api/feedback/trainer/${trainers[0]._id}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        expect(err).toBeDefined();
        done();
      });
  });

  test('test with no trainer id', async done => {
    request(app)
      .get(`/api/feedback/trainer/`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, result) => {
        expect(err).toBeDefined();
        done();
      });
  });
});
