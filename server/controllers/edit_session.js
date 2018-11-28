const createError = require("http-errors");
const editSessionQurery = require("./../database/queries/edit_session");

const editSession = (req, res) => {
  const { _id } = req.params;
  const { sessionType, startDate, attendeesNumber } = req.body;

  editSessionQurery(sessionType, startDate, attendeesNumber, _id)
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(() => {
      res.status(500);
      res.send((createError(500, "Error in inserting the session")));
    });
};

module.exports = editSession;
