const Trainer = require('../models/Trainer');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const passport = require("passport");
// require("env2")("./config/config.env");
const keys = require("../../../config/keys")

// let { passportKey } = process.env;

const loginTrainer = (email, password, errors) => new Promise ((resolve, reject) => {
// Find trainer by email
 Trainer.findOne({ email })
 .then(trainer => {
   if(!trainer) {
     errors.email = 'Trainer not found';
     reject(errors)
   } else {
    // password check (req vs. database)
    bcrypt.compare(password, trainer.password)
    .then(match => {
      if(match) {
      // resolve(match)
      const payload = { id: trainer.id, firstName: trainer.firstName } // prepare for jwt

      // Sign token

      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        resolve({
          success: true,
          token: 'Bearer ' + token
        });
      });

      } else {
        errors.password = 'Password incorrect'
        reject(errors)
      }
   });
  }
 });
});


module.exports = loginTrainer;