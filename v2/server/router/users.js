const express = require('express');

const {
  getUserResults,
  getListOfTrainers,
} = require('../controllers/users/user');
const { getDashboardStats } = require('../controllers/users/all');

const router = express.Router();

router.get('/users/:id/results', getUserResults);
// router.get('/trainer/info', getTrianerReachData);
router.post('/all/dashboard', getDashboardStats);
router.get('/users/my-trainers', getListOfTrainers);

module.exports = router;
