const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for login participant route', () => {
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

  test('test with correct pin', done => {
    const PIN = 'HIO13';

    request(app)
      .post('/api/participant-login')
      .send(PIN)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        done();
      });
  });

  test('test with invalid pin', done => {
    const PIN = '78YG';

    request(app)
      .post('/api/participant-login')
      .send(PIN)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch('login failed, PIN is not exist');
        done(err);
      });
  });
});
