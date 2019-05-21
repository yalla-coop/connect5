const express = require('express');
const loginController = require('./../controllers/login');
const addSessionController = require('./../controllers/add-session');
const usersRouter = require('./users');

const router = express.Router();

router.post('/login', loginController);
router.post('/login', loginController);
router.post('/add-session', addSessionController);
router.use(usersRouter);

module.exports = router;
