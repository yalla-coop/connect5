const express = require('express');
const loginController = require('./../controllers/login');
const addSessionController = require('./../controllers/addSession');
const ParticipantLoginController = require('./../controllers/participantLogin');
const usersRouter = require('./users');
const getFilteredBehavioral = require('./../controllers/behavioralInsight/getFilteredBehavioral');
const getFeedback = require('../controllers/feedback/getFeedback');
const logoutController = require('../controllers/logout');

const surveyQs = require('../controllers/survey/getSurveyQs');
const storeSurvey = require('../controllers/survey/storeSurvey');
const getSurveyResponses = require('../controllers/survey/getSurveyResponses');
const getSessionDetails = require('../controllers/sessionDetails/getSessionDetails');
const getSessionByShortId = require('../controllers/sessionDetails/getSessionByShortId');
const deleteSession = require('../controllers/sessionDetails/deleteSession');
const editSession = require('../controllers/sessionDetails/editSession');
const updateEmails = require('../controllers/sessionDetails/updateEmails.js');

const sendSurveyByEmail = require('../controllers/survey/emailSurvey');

const authentication = require('./../middlewares/authentication');

const getParticipantSessions = require('../controllers/users/getParticipantSessions');
const participantSurveyStatus = require('../controllers/users/participantSurveyStatus');
const generateCertificate = require('../controllers/users/generateCertificate');
const checkPINResponsesOnSurvey = require('../controllers/survey/checkPINResponsesOnSurvey');
const confirmEmailRegistration = require('../controllers/sessionDetails/confirmEmailRegistration');
const updateAttendeesList = require('../controllers/sessionDetails/updateAttendeesList');
const sendReminderEmail = require('../controllers/sessionDetails/sendReminderEmail');
const scheduleEmail = require('../controllers/sessionDetails/scheduleEmail');
const cancelScheduleEmail = require('../controllers/sessionDetails/cancelScheduleEmail');
const updateParicipants = require('../controllers/sessionDetails/updateParicipants');
const createSpecialRequirements = require('../controllers/createSpecialRequirements');

const getCSVData = require('../controllers/feedback/exportCSVData');

const getResponseCount = require('../controllers/feedback/getResponseCount');

const router = express.Router();

router.post('/participant-login', ParticipantLoginController);
router.get('/participant/PIN/:PIN/progress', getParticipantSessions);
router.get('/participant/email/:email/progress', getParticipantSessions);
router.post('/participant/:PIN', participantSurveyStatus);
router.post('/certificate/:sessionId', generateCertificate);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/add-session', authentication(), addSessionController);

// Route = "/session?shortId=:shortId"
router.get('/sessions', getSessionByShortId);

router.patch('/sessions/:sessionId/confirm-email', confirmEmailRegistration);
router.get('/session-details/:id', getSessionDetails);
router.delete('/session-delete/:id', deleteSession);
router.patch('/session-edit/:id', editSession);
router.patch('/emails-update/:id', updateEmails);

router.post('/behavioral-insight', getFilteredBehavioral);

router.post('/feedback/', getFeedback);

router.post('/feedback/responseCount', getResponseCount);

router.use(usersRouter);

router.get('/survey/:id', surveyQs);
router.get('/survey/:surveyType&:shortId/:PIN', checkPINResponsesOnSurvey);

router.get('/session/:sessionId/:surveyType/responses', getSurveyResponses);

router.post('/survey/submit', storeSurvey);

router.post('/survey/email', sendSurveyByEmail);

router.post('/export-csv', authentication(), getCSVData);
router.patch(
  '/sessions/:sessionId/attendeesList',
  authentication(),
  updateAttendeesList
);

router.post('/sessions/:sessionId/emails', authentication(), sendReminderEmail);

router.post(
  '/sessions/:sessionId/scheduled-emails',
  authentication(),
  scheduleEmail
);

router.delete(
  '/sessions/:sessionId/scheduled-emails/:scheduledEmailId',
  authentication(),
  cancelScheduleEmail
);

router.post(
  '/sessions/:sessionId/special-requirements',
  createSpecialRequirements
);

// update participant emails
// sends emails if sendEmail option was added to req.body
router.patch('/sessions/:sessionId/participants-emails', updateParicipants);

module.exports = router;
