const User = require('../models/User');
const Session = require('../models/Session');
const Response = require('../models/Response');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Participant = require('../models/Participant');

const resetDB = async () => {
  await Session.deleteMany();
  await User.deleteMany();
  await Response.deleteMany();
  await Question.deleteMany();
  await Answer.deleteMany();
  await Participant.deleteMany();
};

module.exports = resetDB;
