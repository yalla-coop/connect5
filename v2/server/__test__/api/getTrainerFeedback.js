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
    const trainers = await User.find({ role: 'trainer' });
    const data = { trainerId: trainers[0]._id, role: 'trainer' };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body[0].counter[0].surveyTypes.length).toBeDefined();
        expect(result.body[0]).toBeDefined();
        done();
      });
    done();
  });

  test('test with valid session id', async done => {
    const trainers = await User.find({ role: 'trainer' });
    const sessions = await Session.find({ type: 2, trainers: trainers[0] });
    const data = { sessionId: sessions[0]._id };
    request(app)
      .post(`/api/feedback/`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body).toBeDefined();
        expect(result.body[0].counter[0].surveyTypes.length).toBe(1);
        expect(result.body[0]).toBeDefined();
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
    const trainers = await User.find({ role: 'trainer' });
    const sessions = await Session.find({ type: 1, trainers: trainers[0] });
    const data = { sessionId: sessions[0]._id, surveyType: 'post-day-1' };
    request(app)
      .post(`/api/feedback/`)
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
