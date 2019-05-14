const mongoose = require('mongoose');

const User = require('./../../../database/models/User');
const Session = require('./../../../database/models/Session');
const buildDB = require('./../../../database/data/test');

describe('Test Session schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should Session schema be defined', async () => {
    expect(Session).toBeDefined();
  });

  test('should Session schema get data correctly', async done => {
    const sessions = await Session.find();

    expect(sessions).toHaveLength(6);
    done();
  });

  test('should Session schema store correctly', async done => {
    const trainer = await User.findOne({ role: 'trainer' });

    const session = {
      date: '2019-05-14',
      type: '1',
      numberOfAttendees: 10,
      region: 'North East',
      trainers: [trainer],
      participantsEmails: [
        'ramy@gmail.com',
        'abd@gmail.com',
        'marwa@gmail.com',
        'joe@gmail.com',
        'simon@gmail.com',
      ],
    };
    const storedSession = await Session.create(session);

    expect(storedSession.numberOfAttendees).toBe(session.numberOfAttendees);
    expect(storedSession.trainers[0]._id).toBe(trainer._id);
    done();
  });
});
