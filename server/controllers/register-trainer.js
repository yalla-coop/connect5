const express = require("express");
const router = express.Router();
const registerTrainer = require('../database/queries/register-trainer')
// Load Trainer Model
const Trainer = require('../database/models/Trainer');
// Load Input Validation File
const validateRegisterTrainer = require('../validation/register-trainer-val');

router.post('/', (req, res) => {
  const { errors, isValid } = validateRegisterTrainer(req.body);
  const email = req.body.email;
  const newTrainer = new Trainer({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
          });
// check for errors
    if (!isValid) {
      return res.status(400).json(errors);
    }

    registerTrainer(email, errors, newTrainer)
    .then(trainer => res.status(200).json(trainer))
    .catch(err => res.status(400).json(err))

// // check if email already exists
//   Trainer.findOne({ email: req.body.email }).then(trainer => {
//     if (trainer) {
//     errors.email = 'Email already exists';
//     return res.status(400).json(errors);
//     } else {
//       const newTrainer = new Trainer({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password
//       });
//   // pw to be hashed
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newTrainer.password, salt, (err, hash) => {
//           if (err) throw err;
//           newTrainer.password = hash;
// // save new trainer
//     newTrainer
//     .save()
//     .then(trainer => res.json(trainer))
//     .catch(err => console.log(err))
//     });
//    });
//   }
//  })
});

module.exports = router;

