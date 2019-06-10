const mongoose = require('mongoose');

const User = require('./../../../database/models/User');
const Response = require('./../../../database/models/Response');
const Session = require('./../../../database/models/Session');
const buildDB = require('./../../../database/data/test');

describe('Test Response schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should Response schema be defined', async () => {
    expect(Response).toBeDefined();
  });

  test('should Response schema get data correctly', async done => {
    const responses = await Response.find();

    expect(responses).toHaveLength(9);
    done();
  });

  test('should Response schema store correctly', async done => {
    const trainer = await User.findOne({ role: 'trainer' });
    const session = await Session.findOne();

    const response = {
      PIN: 'HIO13',
      trainers: [trainer],
      surveyType: 'pre-day-1',
      session,
    };
    const storedRespons = await Response.create(response);

    expect(storedRespons.PIN).toBe(response.PIN);
    expect(storedRespons.trainers[0]._id).toBe(trainer._id);
    done();
  });
});
