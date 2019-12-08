const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for logout route', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('test with trainer/locallead/admin log out', done => {
    const data = {
      email: 'nisha.sharma@phe.gov.uk',
      password: '123456',
    };

    request(app)
      .post('/api/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        const token = res.headers['set-cookie'][0].split(';')[0];

        request(app)
          .post(`/api/logout`)
          .set('Cookie', [token])
          .expect(200)
          .end(async (error, result) => {
            expect(result.header['set-cookie'][0].split(';')[0]).toBe('token=');
            done(error);
          });
      });
  });

  test('test with participant log out', done => {
    const data = { PIN: 'HIO13' };

    request(app)
      .post('/api/participant-login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        const token = res.headers['set-cookie'][0].split(';')[0];

        request(app)
          .post(`/api/logout`)
          .set('Cookie', [token])
          .expect(200)
          .end(async (error, result) => {
            expect(result.header['set-cookie'][0].split(';')[0]).toBe('token=');
            done(error);
          });
      });
  });
});
