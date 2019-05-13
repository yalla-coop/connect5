const Session = require("../models/Session");
const Trainer = require("../models/Trainer");

const viewSessions = email => new Promise((resolve, reject) => {
  Trainer.findOne(
    {
      email,
    },
    "_id",
  )
    .then((trainer) => {
      Session.find({
        trainer: trainer._id,
      }).then((data) => {
        resolve(data);
      });
    })
    .catch(err => reject(err));
});

module.exports = viewSessions;
