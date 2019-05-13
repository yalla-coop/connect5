/* eslint-disable no-param-reassign */
const bcrypt = require("bcryptjs");
const Trainer = require("../models/Trainer");

const registerTrainer = (email, errors, newTrainer) => new Promise((resolve, reject) => {
  Trainer.findOne({ email })
    .then((trainer) => {
      if (trainer) {
        errors.email = "Email already exists";
        reject(errors);
      } else {
        // pw to be hashed
        bcrypt.genSalt(10, (genSaltErr, salt) => {
          bcrypt.hash(newTrainer.password, salt, (err, hash) => {
            if (err) throw err;
            newTrainer.password = hash;
            // save new trainer
            newTrainer
              .save()
              .then(resolve)
              .catch(error => reject(error));
          });
        });
      }
    });
});

module.exports = registerTrainer;
