const request = require('supertest');
const mongoose = require('mongoose');
const User = require('./../../database/models/User');

const buildDB = require('./../../database/data/test');
const app = require('./../../app');

describe('Tesing for addTrainerToGroup route', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test with adding new trainer', async done => {
    const localLead = await User.findOne({ email: 'nisha.sharma@phe.gov.uk' });

    const localLeadLoginData = {
      email: 'nisha.sharma@phe.gov.uk',
      password: '123456',
    };

    const data = {
      email: 'new-trainer@connnect5.com',
      name: 'New',
      region: 'North East',
      localLead: localLead._id,
      localLeadName: localLead.name,
      newUser: true,
    };

    request(app)
      .post('/api/login')
      .send(localLeadLoginData)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        const token = result.headers['set-cookie'][0].split(';')[0];
        request(app)
          .post('/api/users/local-leads/group')
          .set('Cookie', [token])
          .send(data)
          .expect(200)
          .end(async (error, response) => {
            const updatedLocalLead = await User.findOne({
              email: 'nisha.sharma@phe.gov.uk',
            });

            const createdTrainer = await User.findOne({
              email: 'new-trainer@connnect5.com',
            });

            // new trainer must be stored in DB
            expect(createdTrainer.role).toBe('trainer');

            // new trainer must be belong to the local lead we sent
            expect(createdTrainer.localLead).toEqual(localLead._id);

            // local lead group must hove new additional trainer
            expect(localLead.trainersGroup).toHaveLength(4);
            expect(updatedLocalLead.trainersGroup).toHaveLength(5);

            // success message
            expect(response.body.success).toBe(
              `New has been added to ${localLead.name}'s group and login details have been sent to his/her email`
            );

            done(error);
          });
      });
  });

  test('test with exists trainer', async done => {
    const localLead = await User.findOne({ email: 'clare.baguley@hee.nhs.uk' });

    const localLeadLoginData = {
      email: 'clare.baguley@hee.nhs.uk',
      password: '123456',
    };

    const trainer = await User.findOne({ role: 'trainer' });

    const data = {
      email: trainer.email,
      localLead: localLead._id,
      localLeadName: localLead.name,
      newUser: false,
    };

    request(app)
      .post('/api/login')
      .send(localLeadLoginData)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        const token = result.headers['set-cookie'][0].split(';')[0];
        request(app)
          .post('/api/users/local-leads/group')
          .set('Cookie', [token])
          .send(data)
          .expect(200)
          .end(async (error, response) => {
            const updatedLocalLead = await User.findOne({
              email: 'clare.baguley@hee.nhs.uk',
            });

            const updatedTrainer = await User.findOne({
              email: trainer.email,
            });

            // new trainer must be stored in DB
            expect(updatedTrainer.role).toBe('trainer');

            // new trainer must be belong to the local lead we sent
            expect(updatedTrainer.localLead).toEqual(localLead._id);

            // local lead group must hove new additional trainer
            expect(localLead.trainersGroup).toHaveLength(0);
            expect(updatedLocalLead.trainersGroup).toHaveLength(1);

            // success message
            expect(response.body.success).toBe(
              `${trainer.name} has been added to ${localLead.name}'s group and login details have been sent to his/her email`
            );

            done(error);
          });
      });
  });
});
