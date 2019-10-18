const mongoose = require('mongoose');
const { compare } = require('bcryptjs');

const User = require('./../../../database/models/User');
const buildDB = require('./../../../database/data/test');

describe('Test User schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should User schema be defined', () => {
    expect(User).toBeDefined();
  });

  test('should User schema store correctly', async done => {
    const user = {
      name: 'newUser',
      email: 'new@user.test',
      password: '123456',
      role: 'localLead',
      organization: 'PHE (public health england)',
      region: 'South West',
    };

    const storedUser = await User.create(user);
    expect(storedUser).toBeDefined();

    // stored values
    expect(storedUser.name).toBe(user.name);
    expect(storedUser.email).toBe(user.email);
    expect(storedUser.role).toBe(user.role);
    expect(storedUser.organization).toBe(user.organization);
    expect(storedUser.region).toBe(user.region.toLocaleLowerCase());

    // hashing password
    compare(user.password, storedUser.password).then(isTrue => {
      expect(isTrue).toBeTruthy();
      done();
    });

    // check for isCorrectPassword new method
    const isCorrectPasswordCorrect = await storedUser.isCorrectPassword(
      user.password
    );
    const isCorrectPasswordFalse = await storedUser.isCorrectPassword(
      'False password'
    );
    expect(isCorrectPasswordCorrect).toBeTruthy();
    expect(isCorrectPasswordFalse).toBeFalsy();
    done();
  });
});
