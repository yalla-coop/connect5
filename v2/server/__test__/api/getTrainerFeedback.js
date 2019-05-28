const request = require('supertest');
const mongoose = require('mongoose');
const User = require('./../../database/models/User');

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
    request(app)
      .get(`/api/feedback/trainer/${trainers[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body.length).toBeDefined();
        expect(result.body[0]).toBeDefined();
        done(err);
      });
  });

  test('test with invalid trainer id', async done => {
    request(app)
      .get(`/api/feedback/trainer/noId`)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        expect(err).toBeDefined();
        done(err);
      });
  });

  test('test with no trainer id', async done => {
    request(app)
      .get(`/api/feedback/trainer/`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, result) => {
        expect(err).toBeDefined();
        done(err);
      });
  });
});
