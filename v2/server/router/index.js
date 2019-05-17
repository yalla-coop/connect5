const express = require('express');
const loginController = require('./../controllers/login');
const usersRouter = require('./users');

const router = express.Router();

router.post('/login', loginController);
router.use(usersRouter);

module.exports = router;
