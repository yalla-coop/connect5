const User = require('../models/User');
const Session = require('../models/Session');
const Response = require('../models/Response');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const resetDB = async () => {
  await Session.deleteMany();
  await User.deleteMany();
  await Response.deleteMany();
  await Question.deleteMany();
  await Answer.deleteMany();
};

module.exports = resetDB;
