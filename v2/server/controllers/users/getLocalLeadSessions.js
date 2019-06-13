const boom = require('boom');
const {
  getLocalLeadSessionsQuery,
  getAdminSessionsQuery,
} = require('./../../database/queries/users/localLead');

const {
  getLocalLeadSessions,
  getTrianerSessions,
} = require('../../database/queries/users/getLeadSessions');

module.exports = async (req, res, next) => {
  // const { role } = req.user;
  const { id } = req.params;

  const data = await getLocalLeadSessions(id).catch(err => console.log(err));

  let sessions;

  if (data.length === 0) {
    sessions = [];
  } else {
    sessions = data[0].sessions;
  }

  // const { sessions } = data[0];
  // console.log('data', data[0].sessions);
  return res.json(sessions);
  // const promise =
  //   role === 'localLead'
  //     ? getLocalLeadSessionsQuery(id)
  //     : getAdminSessionsQuery();

  // promise
  //   .then(sessions => {
  //     console.log('sessions', sessions);
  //     if (!sessions) {
  //       return next(boom.notFound('No sessions founded'));
  //     }
  //     return res.json(sessions);
  //   })
  //   .catch(err => {
  //     boom.badImplementation();
  //   });
};
