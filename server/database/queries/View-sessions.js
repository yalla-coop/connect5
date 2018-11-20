const Session = require('../models/Session');
const Trainer = require('../models/Trainer');

const viewSessions = () => new Promise((resolve, reject) => {
  Trainer.findOne({
    email: 'johndoe@gmail.com',
  }, '_id')
    .then((trainer) => {
      Session.find({
        trainer: trainer._id,
      })
        .then((data) => {
          resolve(data);
        });
    })
    .catch(err => reject(err));
});

module.exports = viewSessions;
