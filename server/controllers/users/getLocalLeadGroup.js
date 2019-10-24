const boom = require('boom');
const {
  getLocalLeadTrainersGroup,
} = require('./../../database/queries/users/localLead');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const localLeadGroup = await getLocalLeadTrainersGroup(id);
    if (!localLeadGroup) {
      return next(boom.notFound('No local leads founded'));
    }
    return res.json(localLeadGroup.length > 0 ? localLeadGroup[0].group : []);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
