const express = require('express');
const loginController = require('./../controllers/login');
const ParticipantLoginController = require('./../controllers/participant-login');
const usersRouter = require('./users');
const getParticipantBehavioralInsight = require('./../controllers/behavioralInsight/getParticipantBehavioralInsight');
const getSessionBehavioralInsight = require('./../controllers/behavioralInsight/getSessionBehavioralInsight');
const getTrainerBehavioralInsight = require('./../controllers/behavioralInsight/getTrainerBehavioralInsight');

const surveyQs = require('../controllers/survey/getSurveyQs');
const storeSurvey = require('../controllers/survey/storeSurvey');

const router = express.Router();

router.post('/participant-login', ParticipantLoginController);
router.post('/login', loginController);

router.get(
  '/behavioral-insight/participant/:PIN',
  getParticipantBehavioralInsight
);

router.get(
  '/behavioral-insight/survey/:sessionId/:surveyType',
  getSessionBehavioralInsight
);
router.get('/behavioral-insight/trainer/:id', getTrainerBehavioralInsight);

router.use(usersRouter);

router.get('/survey/:id', surveyQs);
router.post('/survey/submit', storeSurvey);

module.exports = router;
