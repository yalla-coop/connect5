const express = require('express');

const router = express.Router();

const { getTrianerReachData } = require('../controllers/users/trainer');
const { getLocalLeadOverview } = require('../controllers/users/localLead');
const { getAdminOverview } = require('../controllers/users/admin');
const { getUserResults } = require('../controllers/users/user');

router.get('/trainer/info', getTrianerReachData);

router.get('/localLead/info', getLocalLeadOverview);

router.get('/admin/info', getAdminOverview);

router.get('/users/:id/results', getUserResults);

module.exports = router;
