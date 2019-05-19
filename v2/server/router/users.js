const express = require('express');

const { getUserResults } = require('../controllers/users/user');
const { getDashboardStats } = require('../controllers/users/all');

const router = express.Router();

router.get('/users/:id/results', getUserResults);
// router.get('/trainer/info', getTrianerReachData);
router.post('/all/dashboard', getDashboardStats);

module.exports = router;
