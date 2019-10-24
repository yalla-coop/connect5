const SpecialRequirement = require('./../models/SpecialRequirement');

module.exports.createSpecialRequirement = ({ email, message, sessionId }) =>
  SpecialRequirement.create({ email, message, session: sessionId });
