const createError = require("http-errors");
const deleteSession = require("./../database/queries/delete-session");

const deleteSessionById = (req, res) => {
  const { _id } = req.params;
  deleteSession(_id)
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch((err) => {
      res.status(500);
      res.send((createError(500, "Error in inserting the session")));
    });
};

module.exports = deleteSessionById;
