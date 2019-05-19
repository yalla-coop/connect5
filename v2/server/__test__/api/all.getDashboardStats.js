const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

describe('Testing dashboard stats API', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('test with trainer', done => {
    const data = { userType: 'trainer' };

    request(app)
      .post('/api/all/dashboard')
      .send(data)
      .expect(200)
      .end(async (err, res) => {
        expect(1).toBe(1);
        expect(res.body).toBeDefined();
        expect(res.body.stats).toBeDefined();
        expect(res.body.stats.participantCount).toBe(23);
        expect(res.body.stats.responseRate).toBe(9);
        expect(res.body.userType).toBe(data.userType);
        done(err);
      });
  });
});
