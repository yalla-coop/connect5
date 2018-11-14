const express = require('express');

const trainerController = require('./trainer');
const registerTrainer = require('./register-trainer');
const router = express.Router();

router.use('/trainer', trainerController);
router.use('/register', registerTrainer);

module.exports = router;
