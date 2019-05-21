const express = require('express');

const { getUserResults } = require('../controllers/users/user');
const { getDashboardStats } = require('../controllers/users/all');
const fetchAllTrainers = require('../controllers/users/trainers');

const router = express.Router();

router.get('/users/:id/results', getUserResults);
// router.get('/trainer/info', getTrianerReachData);
router.post('/all/dashboard', getDashboardStats);
router.get('/fetch-trainers', fetchAllTrainers);

module.exports = router;
