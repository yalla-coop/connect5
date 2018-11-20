const express = require('express');

const trainerController = require('./trainer');
const viewSessions = require('./view-sessions');

const router = express.Router();

router.use('/trainer', trainerController);
router.use('/view-sessions', viewSessions);

module.exports = router;
