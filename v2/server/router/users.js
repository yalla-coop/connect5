const express = require('express');

const router = express.Router();

const { getUserResults } = require('../controllers/users/user');

router.get('/users/:id/results', getUserResults);

module.exports = router;
