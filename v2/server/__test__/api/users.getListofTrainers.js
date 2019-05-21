const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

describe('Testing get trainerList API', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('test it correctly gets the results', done => {
    request(app)
      .get('/api/users/my-trainers')
      .expect(200)
      .end(async (err, res) => {
        expect(1).toBe(1);
        expect(res.body).toBeDefined();
        expect(res.body.trainerCount).toBe(3);
        done(err);
      });
  });
});
