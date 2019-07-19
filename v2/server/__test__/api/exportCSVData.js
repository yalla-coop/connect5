const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('../../database/data/test');
const app = require('../../app');

describe('Testing export data for CSV', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('test it correctly gets the results for admin', done => {
    // admin
    const data = { email: 'elysabeth@connect5.com', password: '123456' };
    request(app)
      .post('/api/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers['set-cookie'][0].split(';')[0];
        const searchData = { filter: false };
        const csvRequest = { searchData };

        request(app)
          .post('/api/export-csv')
          .set('Cookie', [token])
          .send(csvRequest)
          .expect(200)
          .end(async (err, res) => {
            expect(1).toBe(1);
            expect(res.body).toBeDefined();
            expect(res.body[0]['Agreed to Research']).toBeDefined();
            expect(res.body[0]['Session Date']).toBeDefined();
            expect(res.body[0]['Session Region']).toBeDefined();
            expect(res.body.length).toBe(5);
            done(err);
          });
      });
  });
});
