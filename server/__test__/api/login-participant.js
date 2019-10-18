const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for login participant route', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test with correct pin', done => {
    const data = { PIN: 'HIO13' };

    request(app)
      .post('/api/participant-login')
      .send(data)
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        done(err);
      });
  });

  test('test with invalid pin', done => {
    const PIN = '78YG';

    request(app)
      .post('/api/participant-login')
      .send(PIN)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(async (err, res) => {
        expect(res.body.error).toMatch('login failed, PIN is not exist');
        done(err);
      });
  });
});
