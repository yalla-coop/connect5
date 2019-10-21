const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

const User = require('../../database/models/User');

describe('Testing dashboard stats API', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('test without credentials trainer', done => {
    const data = { userType: 'trainer' };

    request(app)
      .post('/api/all/dashboard')
      .send(data)
      .expect(401)
      .end(async (err, res) => {
        done(err);
      });
  });

  test("test with trainer's credentials", done => {
    const data = { email: 'alex@connect5.uk', password: '123456' };
    request(app)
      .post('/api/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers['set-cookie'][0].split(';')[0];

        const trainer = await User.findOne({ role: 'trainer' });

        const resultData = {
          id: trainer.id,
          filters: { trainer: [trainer.id] },
        };

        request(app)
          .post('/api/users/213123/results')
          .set('Cookie', [token])
          .send(resultData)
          .expect(200)
          .end(async (err, res) => {
            expect(1).toBe(1);
            expect(res.body).toBeDefined();
            expect(res.body.sessions).toBeDefined();
            expect(res.body.newSurveys).toBeDefined();
            expect(res.body.registrationDate).toBeDefined();
            expect(res.body.sessions.length).toEqual(4);
            done(err);
          });
      });
  });
});
