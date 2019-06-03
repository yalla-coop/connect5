const express = require('express');
const loginController = require('./../controllers/login');
const addSessionController = require('./../controllers/add-session');
const ParticipantLoginController = require('./../controllers/participant-login');
const usersRouter = require('./users');
const getParticipantBehavioralInsight = require('./../controllers/behavioralInsight/getParticipantBehavioralInsight');

const surveyQs = require('../controllers/survey/getSurveyQs');
const storeSurvey = require('../controllers/survey/storeSurvey');
const getSessionDetails = require('../controllers/sessionDetails/getSessionDetails');
const deleteSession = require('../controllers/sessionDetails/deleteSession');
const editSession = require('../controllers/sessionDetails/editSession');
const updateEmails = require('../controllers/sessionDetails/updateEmails');

const router = express.Router();

router.post('/participant-login', ParticipantLoginController);
router.post('/login', loginController);
router.post('/login', loginController);
router.post('/add-session', addSessionController);

router.get(
  '/behavioral-insight/participant/:PIN',
  getParticipantBehavioralInsight
);

router.get('/session-details/:id', getSessionDetails);
router.delete('/session-delete/:id', deleteSession);
router.patch('/session-edit/:id', editSession);
router.patch('/emails-update/:id', updateEmails);
router.use(usersRouter);

router.get('/survey/:id', surveyQs);
router.post('/survey/submit', storeSurvey);

module.exports = router;
