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
    console.log('successful');
  });
  // check if we can create,save and get a user
  // it('gets a user', async () => {
  //   const user = new User({
  //     name: 'tester',
  //     email: 'tester@tester.com',
  //     password: '123456'
  //   });
  //   await user.save();

  //   const foundUser = await User.findOne({ name: 'tester' });
  //   console.log(foundUser);
  //   const expected = 'tester';
  //   const actual = foundUser.name;
  //   expect(actual).toEqual(expected);
  // });
});