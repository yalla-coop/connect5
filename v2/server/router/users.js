const express = require('express');

const router = express.Router();

const { getTrianerReachData } = require('../controllers/users/trainer');

const { getDashboardStats } = require('../controllers/users/all');

router.get('/trainer/info', getTrianerReachData);
router.post('/all/dashboard', getDashboardStats);

module.exports = router;
