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

  test('test with adding new trainer to official local lead', async done => {
    const localLead = await User.findOne({ email: 'nisha.sharma@phe.gov.uk' });

    const localLeadLoginData = {
      email: 'nisha.sharma@phe.gov.uk',
      password: '123456',
    };

    const data = {
      email: 'new-trainer@connnect5.com',
      name: 'New Trainer',
      region: 'North East',
      localLead: { key: localLead._id, label: localLead.name },
      newUser: true,
      managers: [{ key: localLead._id, label: localLead.name }],
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
            expect(response.body).toBeDefined();
            expect(response.body.errors.length).toBe(0);
            expect(response.body.managers[0]).toBe(localLead.name);
            const updatedLocalLead = await User.findOne({
              email: 'nisha.sharma@phe.gov.uk',
            });

            const createdTrainer = await User.findOne({
              email: 'new-trainer@connnect5.com',
            });

            // new trainer must be stored in DB
            expect(createdTrainer.role).toBe('trainer');
            expect(createdTrainer.managers[0].toString()).toBe(
              localLead._id.toString()
            );

            // new trainer must be belong to the local lead we sent
            expect(createdTrainer.localLead).toEqual(localLead._id);

            // local lead group must hove new additional trainer
            expect(localLead.trainersGroup).toHaveLength(4);
            expect(updatedLocalLead.trainersGroup).toHaveLength(5);

            done(error);
          });
      });
  });

  test('test with adding new trainer to 3 groups', async done => {
    const trainerManagerOne = await User.findOne({
      email: 'tez.cook@hants.gov.uk',
    });
    const trainerManagerTwo = await User.findOne({
      email: 'sara.moreland@medway.gov.uk',
    });
    const localLead = await User.findOne({ email: 'nisha.sharma@phe.gov.uk' });

    const localLeadLoginData = {
      email: 'tez.cook@hants.gov.uk',
      password: '123456',
    };

    const data = {
      email: 'newer-trainer@connnect5.com',
      name: 'New Trainer',
      region: 'North East',
      localLead: { key: localLead._id, label: localLead.name },
      newUser: true,
      managers: [
        { key: localLead._id, label: localLead.name },
        { key: trainerManagerOne._id, label: trainerManagerOne.name },
        { key: trainerManagerTwo._id, label: trainerManagerTwo.name },
      ],
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
            expect(response.body).toBeDefined();
            expect(response.body.errors.length).toBe(0);
            expect(response.body.managers[2].toString()).toBe(
              trainerManagerTwo.name.toString()
            );
            const updatedLocalLead = await User.findOne({
              email: 'nisha.sharma@phe.gov.uk',
            });

            const updatedTrainerManagerOne = await User.findOne({
              email: 'tez.cook@hants.gov.uk',
            });
            const updatedTrainerManagerTwo = await User.findOne({
              email: 'sara.moreland@medway.gov.uk',
            });

            const createdTrainer = await User.findOne({
              email: 'newer-trainer@connnect5.com',
            });

            // new trainer must be stored in DB
            expect(createdTrainer.role).toBe('trainer');

            // new trainer must be belong to the local lead we sent
            expect(createdTrainer.localLead).toEqual(localLead._id);

            // local lead group must hove new additional trainer
            expect(
              updatedLocalLead.trainersGroup.includes(createdTrainer._id)
            ).toBeTruthy();
            expect(
              updatedTrainerManagerOne.trainersGroup.includes(
                createdTrainer._id
              )
            ).toBeTruthy();
            expect(
              updatedTrainerManagerTwo.trainersGroup.includes(
                createdTrainer._id
              )
            ).toBeTruthy();
            expect(createdTrainer.managers).toHaveLength(3);

            done(error);
          });
      });
  });

  test('test with adding new trainer to 3 groups with duplicates', async done => {
    const trainerManagerOne = await User.findOne({
      email: 'tez.cook@hants.gov.uk',
    });
    const trainerManagerTwo = await User.findOne({
      email: 'sara.moreland@medway.gov.uk',
    });
    const localLead = await User.findOne({ email: 'nisha.sharma@phe.gov.uk' });

    const localLeadLoginData = {
      email: 'tez.cook@hants.gov.uk',
      password: '123456',
    };

    const data = {
      email: 'alex@connect5.uk',
      name: 'Alex',
      region: 'North East',
      newUser: false,
      managers: [
        { key: localLead._id, label: localLead.name },
        { key: trainerManagerOne._id, label: trainerManagerOne.name },
        { key: trainerManagerTwo._id, label: trainerManagerTwo.name },
      ],
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
            expect(response.body).toBeDefined();
            expect(response.body.errors.length).toBe(2);
            expect(response.body.errors[0].toString()).toBe(
              localLead.name.toString()
            );

            done(error);
          });
      });
  });
});
