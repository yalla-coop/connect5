const express = require('express');

const router = express.Router();
const loginController = require('./../controllers/login');
const usersRouter = require('./users');

router.post('/login', loginController);
router.use(usersRouter);

module.exports = router;
