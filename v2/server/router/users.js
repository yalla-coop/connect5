const express = require('express');

const router = express.Router();

// import middlewares
const authentication = require('./../middlewares/authentication');

// import routes
const { getTrianerReachData } = require('../controllers/users/trainer');

const getLocalLeads = require('../controllers/users/getLocalLeads');
const signUpTrainer = require('../controllers/users/trainer/signUp');
const checkUniqueEmail = require('./../controllers/users/checkUniqueEmail');
const { getDashboardStats } = require('../controllers/users/all');

// check eamil route if the route doen't contain email query
// then it will skip with next()
router.get('/users', checkUniqueEmail);

router.get('/trainer/info', authentication(), getTrianerReachData);
router.post('/all/dashboard', authentication(), getDashboardStats);

router.post('/trainers', signUpTrainer);

router.get('/local-leads', getLocalLeads);

module.exports = router;
