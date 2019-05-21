const express = require('express');

const {
  getUserResults,
  getListOfTrainers,
  getAllTrainersAndLeads,
} = require('../controllers/users/user');
const { getDashboardStats } = require('../controllers/users/all');

const router = express.Router();

router.get('/users/:id/results', getUserResults);
// router.get('/trainer/info', getTrianerReachData);
router.post('/all/dashboard', getDashboardStats);
router.get('/users/my-trainers', getListOfTrainers);
router.get('/users/admin/trainers-and-leads', getAllTrainersAndLeads);

module.exports = router;
