const mongoose = require('mongoose');
const mongoDB_test = require('../config/keys').mongoURI_TEST

mongoose.connect(mongoDB_test);

const Trainer = require('../server/database/models/Trainer');

const validateRegisterTrainer = require('../server/validation/register-trainer-val');
const errorcheck = require('../server/validation/errorcheck')

// dummy data
const request1 =
{
  firstName: 'Tester',
  lastName: 'Jones',
  email: 'tester@tester.com',
  password: 'abcdef',
  password2: 'abcdef',
};

const request2 =
{
  firstName: 'T',
  lastName: '',
  email: 'tester@tester.com',
  password: '1234',
  password2: '1244',
};

const request3 =
{
  firstName: 'Tester',
  lastName: 'Jones Two',
  email: 'tester@tester.com',
  password: 'dfghjk',
  password2: 'dfghjk'
};


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

// test to sign up Trainer using req 1
  it('gets a trainer', async () => {
    if (!errorcheck(request1)) {
    const testTrainer = new Trainer({
        firstName: request1.firstName,
        lastName: request1.lastName,
        email: request1.email,
        password: request1.password,
      });
    await testTrainer.save();
    const foundTrainer = await Trainer.findOne({ firstName: 'Tester' });
    const expected = 'Tester';
    const actual = foundTrainer.firstName;
    expect(actual).toEqual(expected);
    }
  });
// test for validation of wrong input
  it('returns an error object', async () => {
    const { errors } = validateRegisterTrainer(request2);
   if (!errorcheck(request2)) {
    const testTrainer2 = new Trainer({
      firstName: request2.firstName,
      lastName: request2.lastName,
      email: request2.email,
      password: request2.password,
    });
    await testTrainer2.save();
    const expected = {
      firstName: 'First name must be between 2 and 30 characters',
      lastName: 'Last name field is required',
      password: 'Password must be at least 6 characters',
      password2: 'Passwords must match' }
    const actual = errors;
    expect(actual).toEqual(expected);
  }
  });
  it('checks if email is already registered and returns error', async () => {
    // save first test trainer as base to check if email already exists
    const testTrainer1 = new Trainer({
      firstName: 'Tester',
      lastName: 'Jones',
      email: 'tester@tester.com',
      password: 'abcdef',
    })
    await testTrainer1.save();
    // try to save second test trainer
    const { errors } = validateRegisterTrainer(request3);
    if(!errorcheck(request3)) {
      Trainer.findOne({ email: request3.email }).then(trainer => {
        if (trainer) {
          errors.email = 'Email already exists';
        } else {
          const testTrainer2 = new Trainer({
            firstName: request3.firstName,
            lastName: request3.lastName,
            email: request3.email,
            password: request3.password,
          })
          testTrainer2.save();
        }
         const expected = { email: 'Email already exists' };
         const actual = errors;
         expect(actual).toEqual(expected);
  })
 }
})
});