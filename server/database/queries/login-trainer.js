const Trainer = require('../models/Trainer');
const bcrypt = require('bcryptjs');

const loginTrainer = (email, password, errors) => new Promise ((resolve, reject) => {
// Find trainer by email
 Trainer.findOne({ email })
 .then(trainer => {
   if(!trainer) {
     errors.email = 'Trainer not found';
     reject(errors)
   }
    // password check (req vs. database)
    bcrypt.compare(password, trainer.password)
    .then(match => {
      if(match) {
      resolve(match)
      } else {
        errors.password = 'Password incorrect'
        reject(errors)
      }
   });
  });
});


module.exports = loginTrainer;