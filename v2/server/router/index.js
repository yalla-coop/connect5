const express = require('express');
const loginController = require('./../controllers/login');
const usersRouter = require('./users');
const getParticipantBehavioralInsight = require('./../controllers/behavioralInsight/getParticipantBehavioralInsight');

const router = express.Router();

router.post('/login', loginController);

router.get(
  '/behavioral-insight/participant/:PIN',
  getParticipantBehavioralInsight
);

router.use(usersRouter);

module.exports = router;
