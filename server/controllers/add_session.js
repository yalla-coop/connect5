const createError = require("http-errors");
const addSessionQuery = require("./../database/queries/add_session");
const validate = require("./../validation/create_session");

const addSession = (req, res) => {
  const trainerId = req.user.id;

  const { sessionType, startDate, inviteesNumber } = req.body;
  const data = {
    sessionType,
    startDate,
    inviteesNumber,
  };
  // check the data comes from front-end
  validate(data)
    .then(() => {
      addSessionQuery(trainerId, sessionType, startDate, inviteesNumber)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(() => {
          res.status(500);
          res.send((createError(500, "Error in inserting the session")));
        });
    })
    .catch((errMsg) => {
      res.status(400);
      res.send((createError(400, errMsg)));
    });
};

module.exports = addSession;
