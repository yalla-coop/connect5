const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for getting all local leads', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('get all local leads API /api/local-leads', done => {
    request(app)
      .get('/api/local-leads')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.forEach(user => {
          expect(user.role).toBe('localLead');
        });
        expect(res.body).toHaveLength(9);
        done(err);
      });
  });
});
