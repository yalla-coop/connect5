const createError = require('http-errors');
const addSessionQuery = require('./../database/queries/add_session');
// const validate = require("./../validation/create_session");

const addSession = (req, res) => {
  const { sessionType, startDate, inviteesNumber, region, partner } = req.body;
  // const data = {
  //   sessionType,
  //   startDate,
  //   inviteesNumber,
  //   region,
  //   partner,
  // };
  // check the data comes from front-end
  // validate(data)
  //   .then(() => {
  addSessionQuery(sessionType, startDate, inviteesNumber, region, partner)
    .then(res => {
      console.log(res, 'resssssssssssss');
      res.status(200);
      res.send();
    })
    .catch(() => {
      res.status(500);
      res.send(createError(500, 'Error in inserting the session'));
    });
  // })
  // .catch((errMsg) => {
  //   res.status(400);
  //   res.send((createError(400, errMsg)));
  // });
};

module.exports = addSession;
