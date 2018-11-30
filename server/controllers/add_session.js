const createError = require("http-errors");
const addSessionQuery = require("./../database/queries/add_session");

const addSession = (req, res) => {
  const trainerId = req.user.id;

  const { sessionType, startDate, inviteesNumber } = req.body;
  addSessionQuery(trainerId, sessionType, startDate, inviteesNumber)
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Error in inserting the session")));
    });
};

module.exports = addSession;
