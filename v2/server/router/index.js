const express = require('express');

const surveyQs = require('../controllers/getSurveyQs');

const router = express.Router();

// dummy router just to run the server.
// router.use((req, res, next) => {
//   res.send('test route');
// });

router.get('/survey/:id', surveyQs);

module.exports = router;
