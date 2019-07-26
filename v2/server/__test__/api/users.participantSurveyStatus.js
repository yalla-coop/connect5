const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

const Participant = require('../../database/models/Participant');
const Session = require('../../database/models/Session');

describe('Testing get participant by PIN', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('with valid PIN to get user info', async done => {
    const participant = await Participant.findOne();
    const session = await Session.findOne();

    request(app)
      .post(`/api/participant/${participant.PIN}`)
      .send({ sessionId: session._id })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body[0]).toBeDefined();
        expect(res.body[0].PIN).toBe(participant.PIN);
        done(err);
      });
  });

  test('with invalid PIN', async done => {
    request(app)
      .post('/api/participant/randomPIN')
      .send({ sessionId: null })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        expect(res.error).toBeDefined();
        done(err);
      });
  });

  test('with valid PIN and sessionId including pre-survey', async done => {
    const participant = await Participant.findOne();
    const session = await Session.findOne({ type: 1 });

    request(app)
      .post(`/api/participant/${participant.PIN}`)
      .send({ sessionId: session._id })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body[0]).toBeDefined();
        expect(res.body[0].PIN).toBe(participant.PIN);
        expect(res.body[1]).toBeDefined();
        expect(res.body[1].preResponseExists).toBe(true || false);
        done(err);
      });
  });

  test('with valid PIN and sessionId not including pre-survey', async done => {
    const participant = await Participant.findOne();
    const session = await Session.findOne({ type: 3 });

    request(app)
      .post(`/api/participant/${participant.PIN}`)
      .send({ sessionId: session._id })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body[0]).toBeDefined();
        expect(res.body[0].PIN).toBe(participant.PIN);
        expect(res.body[1]).toBeDefined();
        expect(res.body[1]).toBe('no pre-survey included in session');
        done(err);
      });
  });
});
