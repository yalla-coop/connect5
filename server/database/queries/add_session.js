const Session = require("./../models/Session");
const Trainer = require("./../models/Trainer");

const addSession = (sessionType, startDate, attendantsNumber) => new Promise((resolve, reject) => {
  // Get the default trainer data
  Trainer.findOne({
    email: "johndoe@gmail.com",
  }, "_id")
    .then((defaultTrainer) => {
      const session = new Session({
        trainer: defaultTrainer._id,
        type: sessionType,
        date: startDate,
        invitees: 0,
        attendees: attendantsNumber,
        surveyURL1: "null",
      });
      // Add new session
      session.save()
        .then(resolve)
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

module.exports = addSession;
