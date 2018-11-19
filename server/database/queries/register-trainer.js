const Trainer = require('../models/Trainer');
const bcrypt = require('bcryptjs');

const registerTrainer = (email, errors, newTrainer) => new Promise((resolve, reject) => {
  Trainer.findOne({email})
  .then(trainer => {
    if(trainer) {
      errors.email = 'Email already exists'
      reject(errors)
    } else {
     // pw to be hashed
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newTrainer.password, salt, (err, hash) => {
        if (err) throw err;
        newTrainer.password = hash;
     // save new trainer
      newTrainer
      .save()
      .then(resolve)
      .catch(err => reject(err))
      })
     })
    }
  })
})

module.exports = registerTrainer;