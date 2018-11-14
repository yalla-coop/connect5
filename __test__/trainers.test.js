const mongoose = require('mongoose');
const mongoDB_test = require('../config/keys').mongoURI_TEST

mongoose.connect(mongoDB_test);

const Trainer = require('../server/database/models/Trainer');
const validateRegisterTrainer = require('../server/validation/register-trainer');

describe('Test Trainer model', () => {
  // clear db before each test
  beforeAll(async () => {
    await Trainer.remove({});
  });
  // clear db afer each test
  afterEach(async () => {
    await Trainer.remove({});
  });
  // close connection after test
  afterAll(async () => {
    await mongoose.connection.close();
  });
  // check for Trainer model existence
  it('has a module', () => {
    expect(Trainer).toBeDefined();
  });

// test to sign up Trainer
  it('gets a trainer', async () => {
    const testTrainer = new Trainer({
      firstName: 'Tester',
      lastName: 'Jones',
      email: 'tester@tester.com',
      password: '123456'
    });
    await testTrainer.save();
    const foundTrainer = await Trainer.findOne({ firstName: 'Tester' });
    const expected = 'Tester';
    const actual = foundTrainer.firstName;
    expect(actual).toEqual(expected);
  });
// test for validation of wrong input
  it('gets a trainer', async () => {
    const testTrainer = new Trainer({
      firstName: 'T',
      lastName: '',
      email: 'tester@tester.com',
      password: '1234',
    });
    const { errors, isValid } = validateRegisterTrainer(testTrainer);
    if (!isValid) {
      return errors;
    }
    await testTrainer.save();
    const expected = {
    firstName: 'First name must be between 2 and 30 characters',
    lastName: 'Last name field is required',
    password: 'Password must be at least 6 characters',
    password2: 'Passwords must match'
    }
    const actual = errors;
    expect(actual).toEqual(expected);
  });


});