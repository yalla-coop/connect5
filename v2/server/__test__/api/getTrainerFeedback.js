const request = require('supertest');
const mongoose = require('mongoose');
const User = require('./../../database/models/User');
const Session = require('./../../database/models/Session');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for getTrainerFeedback route', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('test with valid trainer id', async done => {
    const trainer = await User.findOne({ name: 'alex' });
    const data = { trainerId: trainer._id, role: 'trainer' };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body.feedback).toBeDefined();
        done();
      });
    done();
  });

  test('test with valid session id', async done => {
    const trainer = await User.findOne({ name: 'alex' });
    const sessions = await Session.find({ type: 2, trainers: trainer._id });
    const data = { sessionId: sessions[0]._id };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body.feedback).toBeDefined();
        done();
      });
    done();
  });

  test('test with invalid trainer id', async done => {
    const data = { trainerId: 'invalid' };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        expect(err).toBeDefined();
        done();
      });
  });

  test('test with invalid session id', async done => {
    const trainer = await User.findOne({ name: 'alex' });
    const sessions = await Session.find({ type: 1, trainers: trainer._id });
    const data = { sessionId: sessions[0]._id, surveyType: 'post-day-1' };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        done();
      });
  });

  test('test with valid session id and surveyType', async done => {
    const data = { sessionId: 'anything' };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        expect(err).toBeDefined();
        done();
      });
  });

  test('test with no request data', async done => {
    request(app)
      .post(`/api/feedback/`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, result) => {
        expect(err).toBeDefined();
        done();
      });
  });
});
