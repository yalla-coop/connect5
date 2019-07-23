const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

const Participant = require('../../database/models/Participant');

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

  test('with valid PIN', async done => {
    const participant = await Participant.findOne();

    request(app)
      .get(`/api/participant/${participant.PIN}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body).toBe(participant.PIN);
        done(err);
      });
  });

  test('with invalid PIN', async done => {
    request(app)
      .get('/api/participant/randomPIN')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        expect(res.error).toBeDefined();
        done(err);
      });
  });
});
