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
  getAllTrainersAndLeads,
} = require('../controllers/users/user');

const { getDashboardStats } = require('../controllers/users/all');
const fetchAllTrainers = require('../controllers/users/trainers');
const addTrainerToGroup = require('../controllers/users/addTrainerToGroup');
const getUserInfo = require('../controllers/users/getUserInfo');
const getTrainerSessions = require('../controllers/users/trainer/getTrainerSessions');
const getLocalLeadsSessions = require('../controllers/users/getLocalLeadSessions');
const getAllSessions = require('../controllers/users/getAllSessions');

// check eamil route if the route doen't contain email query
// then it will skip with next()
router.get('/users', checkUniqueEmail);

// check for user credentials and send user info
router.get('/users/auth', authentication(), getUserInfo);

router.get('/trainer/info', authentication(), getTrianerReachData);
router.post('/all/dashboard', authentication(), getDashboardStats);

router.post('/trainers', signUpTrainer);

router.post('/users/local-leads/group', authentication(), addTrainerToGroup);
router.get('/local-leads', getLocalLeads);

router.get('/users/:id/results', getUserResults);
// router.get('/trainer/info', getTrianerReachData);
router.post('/all/dashboard', getDashboardStats);
router.get('/fetch-trainers', fetchAllTrainers);
router.get('/users/my-trainers', getListOfTrainers);
router.get('/users/admin/trainers-and-leads', getAllTrainersAndLeads);
router.get('/users/trainer-sessions/:id', getTrainerSessions);
router.get('/users/sessions/:id', authentication(), getLocalLeadsSessions);
router.get('/users/sessions', getAllSessions);

module.exports = router;
