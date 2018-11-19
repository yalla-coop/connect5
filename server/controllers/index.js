const express = require('express');

const trainerController = require('./trainer');
const viewSessions = require('./viewSessions');

const router = express.Router();

router.use('/trainer', trainerController);
router.use('/view-sessions', viewSessions);

module.exports = router;
