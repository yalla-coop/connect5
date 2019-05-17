const express = require('express');

const router = express.Router();

const { getTrianerReachData } = require('../controllers/users/trainer');

router.get('/trainer/info', getTrianerReachData);

module.exports = router;
