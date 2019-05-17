const express = require('express');

const router = express.Router();

const usersRouter = require('./users');

router.use(usersRouter);

module.exports = router;
