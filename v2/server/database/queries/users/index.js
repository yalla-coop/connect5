const moment = require('moment');
const mongoose = require('mongoose');

const Participant = require('../../models/Participant');
const User = require('./../../models/User');
const Session = require('./../../models/Session');

module.exports.getUserByEmail = email => User.findOne({ email });
module.exports.getUserById = id => User.findById(id);
module.exports.getAllSessionsQuery = () => Session.find({});
module.exports.update = (id, data) => {
  return User.updateOne({ _id: id }, { $set: data });
};

module.exports.addManagerToTrainer = (id, localLeadId) => {
  return User.updateOne({ _id: id }, { $addToSet: { managers: localLeadId } });
};

module.exports.getRegistrationDate = async id => {
  const user = await User.findById(id);
  return moment(user.createdAt).format('Do MMM YYYY');
};

module.exports.updateParticipant = data =>
  Participant.findOneAndUpdate({ PIN: data.PIN }, data, {
    new: true,
    upsert: true,
  });

module.exports.getParticipantById = id => Participant.findById(id);

module.exports.getParticipantByPIN = PIN => Participant.find({ PIN });

module.exports.updateUserById = (userId, data) =>
  User.findByIdAndUpdate(
    userId,
    { $set: data },
    // return the updated document
    { new: true }
  );

module.exports.findUserByToken = token =>
  User.findOne({
    'resetToken.value': token,
    'resetToken.expiresIn': { $gt: Date.now() },
  });

module.exports.getAllPins = () => Participant.find({}, { PIN: 1 });

module.exports.deleteTrainerFromAllSessions = trainerId =>
  Session.updateMany(
    {},
    {
      $pullAll: { trainers: [mongoose.Types.ObjectId(trainerId)] },
    }
  );
