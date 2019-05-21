const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for uniqe email route', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test with exists email', done => {
    const email = 'nisha.sharma@phe.gov.uk';

    request(app)
      .get(`/api/users/?email=${email}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        expect(res.body.isUnique).toBeFalsy();
        done();
      });
  });

  test('test with unique email', done => {
    const email = 'unique@new.email';

    request(app)
      .get(`/api/users/?email=${email}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        expect(res.body.isUnique).toBeTruthy();
        done();
      });
  });
});
