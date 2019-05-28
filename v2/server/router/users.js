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
const addTrainerToGroup = require('../controllers/users/addTrainerToGroup');
const getUserInfo = require('../controllers/users/getUserInfo');

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
router.get('/users/my-trainers', getListOfTrainers);
router.get('/users/admin/trainers-and-leads', getAllTrainersAndLeads);

module.exports = router;
