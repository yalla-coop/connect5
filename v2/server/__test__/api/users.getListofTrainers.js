const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

describe('Testing get trainerList API', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('test it correctly gets the results', done => {
    const data = { email: 'nisha.sharma@phe.gov.uk', password: '123456' };
    request(app)
      .post('/api/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers['set-cookie'][0].split(';')[0];

        request(app)
          .get('/api/users/my-trainers')
          .set('Cookie', [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res.body).toBeDefined();
            expect(res.body.trainerCount).toBe(4);
            done(err);
          });
      });
  });
});
