// const request = require('supertest');
// const mongoose = require('mongoose');
//
// const buildDB = require('./../../database/data/development/index');
// const app = require('./../../app');
//
// describe('Tesing for login route', () => {
//   beforeAll(async () => {
//     // build dummy data
//     await buildDB();
//   });
//
//   afterAll(async () => {
//     await mongoose.disconnect();
//   });
//
//   beforeEach(async () => {
//     // build dummy data
//     await buildDB();
//   });
//
//   test('test with correct email and password', done => {
//     const data = {
//       email: 'nisha.sharma@phe.gov.uk',
//       password: '123456',
//     };
//
//     request(app)
//       .post('/api/login')
//       .send(data)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         expect(res).toBeDefined();
//         expect(res.body).toBeDefined();
//
//         expect(res.body.id).toBeDefined();
//         done();
//       });
//   });
//
//   test('test with invalid request email', done => {
//     const data = {
//       email: 'johnDoe@email.com',
//       password: '123456',
//     };
//
//     request(app)
//       .post('/api/login')
//       .send(data)
//       .expect('Content-Type', /json/)
//       .expect(401)
//       .end((err, res) => {
//         expect(res.body.error).toMatch(
//           'login failed, email and password not match'
//         );
//         done(err);
//       });
//   });
//   test('test with invalid request password', done => {
//     const data = {
//       email: 'nisha.sharma@phe.gov.uk',
//       password: '123456563322',
//     };
//
//     request(app)
//       .post('/api/login')
//       .send(data)
//       .expect('Content-Type', /json/)
//       .expect(401)
//       .end((err, res) => {
//         expect(res.body.error).toMatch(
//           'login failed, email and password not match'
//         );
//         done(err);
//       });
//   });
// });
