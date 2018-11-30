const createError = require("http-errors");
const addSessionQuery = require("./../database/queries/add_session");

const addSession = (req, res) => {
  const trainerId = req.user.id;

  const { sessionType, startDate, attendantsNumber } = req.body;
  addSessionQuery(trainerId, sessionType, startDate, attendantsNumber)
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
