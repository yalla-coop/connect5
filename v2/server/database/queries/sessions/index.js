const Response = require('./../../models/Response');

module.exports.getSessionPINs = SessionId =>
  Response.find({ session: SessionId }, { PIN: 1, _id: 0 });
