const mongoose = require('mongoose');
const dbConnection = require("../server/database/db_Connection");
// Connect to DB
dbConnection();

const loginTrainer = require('../server/database/queries/login-trainer');
const registerTrainer = require('../server/database/queries/register-trainer');

const Trainer = require('../server/database/models/Trainer');

const validateLoginTrainer = require('../server/validation/login-trainer-val');

// dummy data requests to be tested
const request1 =
{
  firstName: 'Tester',
  lastName: 'Jones',
  email: 'tester@tester.com',
  password: '123456',
  password2: '123456',
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

const request4 =
{
  email: 'tester@tester.com',
  password: '123456',
};

const testTrainer = new Trainer({
  firstName: request1.firstName,
  lastName: request1.lastName,
  email: request1.email,
  password: request1.password,
});

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
  //save trainer to test db
   await testTrainer.save();
   const { errors, isValid } = validateLoginTrainer(request2);
   const email = request2.email;
   const password = request2.password;
    // check for errors
    if (!isValid) {
     await errors;
    }
    await loginTrainer(email, password, errors)
    .then(match => console.log(match))
    .catch(err => console.log(err))
    const expected = 'Trainer not found';
    const actual = errors.email;
    expect(actual).toEqual(expected);
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
  const email = request3.email;
  const password = request3.password;
   // check for errors
   if (!isValid) {
    await errors;
   }
   await loginTrainer(email, password, errors)
   .then(match => console.log(match))
   .catch(err => console.log(err))
    const expected = 'Password incorrect'
    const actual = errors.password;
    expect(actual).toEqual(expected);
})

// 4) test to log in Trainer successfully (request3)
it('tests to log in trainer with success', async () => {
//register trainer
  const testTrainer = new Trainer({
    firstName: request1.firstName,
    lastName: request1.lastName,
    email: request1.email,
    password: request1.password,
  });
  const noErrors = {};
  const email = request1.email;
   await registerTrainer(email, noErrors, testTrainer)
   .then(trainer => trainer.save())
   .catch(err => console.log(err))
// log in trainer
  const { errors, isValid } = validateLoginTrainer(request3);
  const logInEmail = request4.email;
  const password = request4.password;
   // check for errors
   if (!isValid) {
    await errors;
   }
  await loginTrainer(logInEmail, password, errors)
   .then(match => console.log(match))
   .catch(err => console.log(err))
  })
});