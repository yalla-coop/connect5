const express = require('express');

const router = express.Router();

const { getTrianerReachData } = require('../controllers/users/trainer');

const getLocalLeads = require('../controllers/users/getLocalLeads');

router.get('/trainer/info', getTrianerReachData);

router.get('/local-leads', getLocalLeads);

module.exports = router;
