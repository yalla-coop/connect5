const mongoose = require('mongoose');
const mongoDB = require('../../config/keys').mongoURI;

// connect to db
mongoose.connect(mongoDB);


// load models
const Trainer = require('./models/Trainer');

// input trainer
const trainer = new Trainer({
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: '123456'
});

trainer.save()
.then(trainer => console.log('trainer added: ', trainer))
.catch(err => console.log(err))