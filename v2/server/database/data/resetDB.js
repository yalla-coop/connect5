const User = require('../models/User');
const Session = require('../models/Session');
const Response = require('../models/Response');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Participant = require('../models/Participant');
const SpecialRequirement = require('../models/SpecialRequirement');

const resetDB = async () => {
  await User.deleteMany();
  await Participant.deleteMany();
  await Session.deleteMany();
  await Question.deleteMany();
  await Response.deleteMany();
  await Answer.deleteMany();
  await SpecialRequirement.deleteMany();
};

module.exports = resetDB;
