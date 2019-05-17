const express = require('express');

const surveyQs = require('../controllers/survey/getSurveyQs');
const storeSurvey = require('../controllers/survey/storeSurvey');

const router = express.Router();

// dummy router just to run the server.
// router.use((req, res, next) => {
//   res.send('test route');
// });

router.get('/survey/:id', surveyQs);

router.post('/survey/submit', storeSurvey);

module.exports = router;
