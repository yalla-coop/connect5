const mongoose = require('mongoose');

const SpecialRequirement = require('../../../database/models/SpecialRequirement');
const Session = require('../../../database/models/Session');

const buildDB = require('../../../database/data/test');

describe('Test SpecialRequirement schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should SpecialRequirement schema be defined', () => {
    expect(SpecialRequirement).toBeDefined();
  });

  test('should SpecialRequirement schema get data correctly', async done => {
    const specialRequirement = await SpecialRequirement.find();

    expect(specialRequirement).toHaveLength(6);
    done();
  });

  test('should SpecialRequirement schema store correctly', async done => {
    const session = await Session.findOne();

    const specialRequirement = {
      email: 'test@jest.js',
      message: 'message',
      session: session._id,
    };

    const storedSpecialRequirement = await SpecialRequirement.create(
      specialRequirement
    );

    expect(storedSpecialRequirement.email).toBe('test@jest.js');
    expect(storedSpecialRequirement.message).toBe('message');
    done();
  });
});
