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
    const data = { email: 'elysabeth@connect5.com', password: '123456' };
    request(app)
      .post('/api/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers['set-cookie'][0].split(';')[0];

        request(app)
          .get('/api/users/admin/trainers-and-leads')
          .set('Cookie', [token])
          .expect(200)
          .end(async (err, res) => {
            expect(1).toBe(1);
            expect(res.body).toBeDefined();
            expect(res.body.localLeadCount).toBe(9);
            expect(res.body.trainerCount).toBe(10);
            expect(res.body.localLeadCount).toEqual(
              res.body.localLeadList.length
            );
            expect(res.body.trainerCount).toEqual(res.body.trainerList.length);
            done(err);
          });
      });
  });
});
