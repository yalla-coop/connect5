const Session = require('./../../models/Session');

module.exports.getSessionDetails = id => {
  return Session.findById({ _id: id });
};
