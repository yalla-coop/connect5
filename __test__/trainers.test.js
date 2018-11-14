const mongoose = require('mongoose');
const mongoDB_test = require('../config/keys').mongoURI_TEST

mongoose.connect(mongoDB_test);

const Trainer = require('../server/database/models/Trainer');

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
    console.log(foundTrainer);
    const expected = 'Tester';
    const actual = foundTrainer.firstName;
    expect(actual).toEqual(expected);
  });
});