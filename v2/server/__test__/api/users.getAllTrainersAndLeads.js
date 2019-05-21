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
      .get('/api/users/admin/trainers-and-leads')
      .expect(200)
      .end(async (err, res) => {
        expect(1).toBe(1);
        expect(res.body).toBeDefined();
        expect(res.body.localLeadCount).toBe(9);
        expect(res.body.trainerCount).toBe(10);
        expect(res.body.localLeadCount).toEqual(res.body.localLeadList.length);
        expect(res.body.trainerCount).toEqual(res.body.trainerList.length);
        done(err);
      });
  });
});