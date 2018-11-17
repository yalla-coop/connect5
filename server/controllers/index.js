const express = require("express");

const trainerController = require('./trainer');
const registerTrainer = require('./register-trainer');
const loginTrainer = require('./login-trainer');


const router = express.Router();

router.use('/trainer', trainerController);
router.use('/register', registerTrainer);
router.use('/login', loginTrainer);

module.exports = router;
