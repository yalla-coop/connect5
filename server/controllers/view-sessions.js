const createError = require("http-errors");
const viewSessions = require("./../database/queries/View-sessions");

const ViewSessions = (req, res) => {
  viewSessions()
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(500);
      res.send((createError(500, "Error in inserting the session")));
    });
};

module.exports = ViewSessions;
