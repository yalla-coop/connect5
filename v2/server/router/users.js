const express = require('express');

const router = express.Router();

// import middlewares
const authentication = require('./../middlewares/authentication');

// import routes
const { getTrianerReachData } = require('../controllers/users/trainer');
const getLocalLeads = require('../controllers/users/getLocalLeads');
const signUpTrainer = require('../controllers/users/trainer/signUp');
const checkUniqueEmail = require('./../controllers/users/checkUniqueEmail');
const {
  getUserResults,
  getListOfTrainers,
  getLocalLeadsTrainerList,
  getAllTrainersAndLeads,
} = require('../controllers/users/user');
const getSessionsPerRegions = require('../controllers/users/SessionsPerRegions');

const { getDashboardStats } = require('../controllers/users/all');
const fetchAllTrainers = require('../controllers/users/trainers');
const addTrainerToGroup = require('../controllers/users/addTrainerToGroup');
const getUserInfo = require('../controllers/users/getUserInfo');
const getTrainerSessions = require('../controllers/users/trainer/getTrainerSessions');
const getLocalLeadsSessions = require('../controllers/users/getLocalLeadSessions');
const getAllSessions = require('../controllers/users/getAllSessions');
const removeTrainerToGroup = require('../controllers/users/removeTrainerToGroup');
const getLocalLeadGroup = require('../controllers/users/getLocalLeadGroup');
const changePassword = require('../controllers/users/changePassword');
const getParticipantsDemogrphics = require('../controllers/users/getParticipantsDemogrphics');
const sendInvitation = require('../controllers/users/sendInvitation');
const forgetPassword = require('../controllers/users/forgetPassword');
const resetPassword = require('../controllers/users/resetPassword');
const updateSentInvitationEmails = require('../controllers/users/updatSendInvitation');
const deleteAccount = require('../controllers/users/deleteAccount');
const editProfile = require('../controllers/users/editProfile');

// check eamil route if the route doen't contain email query
// then it will skip with next()
router.get('/users', checkUniqueEmail);
router.put('/users', editProfile);
router.get('/users/forget-password', forgetPassword);
router.post('/users/reset-password', resetPassword);

// check for user credentials and send user info
router.get('/users/auth', authentication(), getUserInfo);

router.get('/trainer/info', authentication(), getTrianerReachData);
router.post('/all/dashboard', authentication(), getDashboardStats);

router.post('/trainers', signUpTrainer);

router.post('/users/local-leads/group', authentication(), addTrainerToGroup);

router.post('/users/change-password', authentication(), changePassword);
router.post('/users/send-invitation', authentication(), sendInvitation);
router.post(
  '/users/update-sent-emails',
  authentication(),
  updateSentInvitationEmails
);
router.get('/local-leads', getLocalLeads);

router.use('/users/:id/results', authentication(), getUserResults);
router.get('/users/my-trainers', authentication(), getListOfTrainers);
router.post(
  '/users/locallead-trainers',
  authentication(),
  getLocalLeadsTrainerList
);
router.get(
  '/users/admin/trainers-and-leads',
  authentication(),
  getAllTrainersAndLeads
);

router.get('/local-lead/:id/group', getLocalLeadGroup);

router.delete(
  '/local-lead/:id/trainer',
  authentication(),
  removeTrainerToGroup
);

router.delete('/users/:userId/deleteAccount', authentication(), deleteAccount);
router.get('/fetch-trainers', fetchAllTrainers);
router.get('/users/admin/trainers-and-leads', getAllTrainersAndLeads);
router.get('/users/trainer-sessions/:id', getTrainerSessions);
router.get('/users/sessions/:id', authentication(), getLocalLeadsSessions);
router.get('/users/sessions', getAllSessions);
router.get('/users/admin/all-sessions-per-region', getSessionsPerRegions);
router.get(
  '/users/admin/demographics/participant',
  authentication(),
  getParticipantsDemogrphics
);

module.exports = router;
