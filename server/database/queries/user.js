const User = require('./../models/User');
const Participant = require('./../models/Participant');
const Session = require('./../models/Session');

module.exports.findByEmail = email => User.findOne({ email });
module.exports.getUserById = id => User.findById(id);
module.exports.getUserNameById = id =>
  User.findById(id).select({ _id: 0, name: 1 });
module.exports.updateUserPasswordById = (userId, password) => {
  return User.findByIdAndUpdate(userId, { password }, { new: true });
};

module.exports.findParticipantByPIN = PIN => Participant.findOne({ PIN });
module.exports.findParticipantByEmailFromSession = email =>
  Session.find({ 'participantsEmails.email': email });
