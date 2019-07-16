const boom = require('boom');

const getParticipantsDemogrphics = require('../../database/queries/users/getParticipantsDemogrphics');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await getParticipantsDemogrphics(id);

    return res.json(data[0]);
  } catch (err) {
    return next(boom.badImplementation());
  }
};
