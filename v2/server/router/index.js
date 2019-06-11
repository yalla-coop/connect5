const express = require('express');
const loginController = require('./../controllers/login');
const addSessionController = require('./../controllers/add-session');
const ParticipantLoginController = require('./../controllers/participant-login');
const usersRouter = require('./users');
const getParticipantBehavioralInsight = require('./../controllers/behavioralInsight/getParticipantBehavioralInsight');
const getTrainerFeedback = require('./../controllers/feedback/getTrainerFeedback');
const logoutController = require('../controllers/logout');

const surveyQs = require('../controllers/survey/getSurveyQs');
const storeSurvey = require('../controllers/survey/storeSurvey');

const router = express.Router();

router.post('/participant-login', ParticipantLoginController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.post('/add-session', addSessionController);

router.get(
  '/behavioral-insight/participant/:PIN',
  getParticipantBehavioralInsight
);

router.post('/feedback/trainer/:trainerId/', getTrainerFeedback);

router.use(usersRouter);

router.get('/survey/:id', surveyQs);
router.post('/survey/submit', storeSurvey);

module.exports = router;
