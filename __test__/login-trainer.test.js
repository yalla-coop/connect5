const mongoose = require('mongoose');
const mongoDB_test = require('../config/keys').mongoURI_TEST
const bcrypt = require('bcryptjs');

mongoose.connect(mongoDB_test);

const Trainer = require('../server/database/models/Trainer');

const validateLoginTrainer = require('../server/validation/login-trainer-val');

// dummy data requests to be tested
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
  email: 'fake@tester.com',
  password: 'abcdef',
};

const request3 =
{
  email: 'tester@tester.com',
  password: 'abcded',
};

// start test build
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

  // 1) check for Trainer model existence
  it('has a module', () => {
    expect(Trainer).toBeDefined();
  });

// 2) test to log in Trainer using wrong email (request2)
  it('tests to log in wrong email', async () => {
   const testTrainer = new Trainer({
      firstName: request1.firstName,
      lastName: request1.lastName,
      email: request1.email,
      password: request1.password,
    });
   await testTrainer.save();
   const { errors, isValid } = validateLoginTrainer(request2);
    // check for errors
      if (!isValid) {
        return errors;
        }
          const email = request2.email
          Trainer.findOne({ email })
          .then(trainer => {
          if(!trainer) {
            errors.email = 'Trainer not found';
            return errors;
          }
          const expected = 'Trainer not found';
          const actual = errors;
          expect(actual).toEqual(expected);
    })
  });

// 3) test to log in Trainer using wrong password (request3)
it('tests to log in with wrong password', async () => {
  const testTrainer = new Trainer({
    firstName: request1.firstName,
    lastName: request1.lastName,
    email: request1.email,
    password: request1.password,
  });

  await testTrainer.save();
  const { errors, isValid } = validateLoginTrainer(request3);
   // check for errors
     if (!isValid) {
       return errors;
       }
         const email = request3.email
         const password = request3.password
         Trainer.findOne({ email })
         .then(trainer => {
           console.log(trainer);

         if(!trainer) {
           errors.email = 'Trainer not found';
           return errors;
         }
         bcrypt.compare(password, trainer.password)
         .then(isMatch => {
          if(isMatch) {
          return isMatch;
          } else {
          errors.password = 'Passwords incorrect'
          return errors;
          }
      })
          const expected = 'Passwords incorrect'
          const actual = errors;
          expect(actual).toEqual(expected);
     })
  })
});