const express = require('express');

const router = express.Router();

// dummy router just to run the server.
router.use((req, res, next) => {
  res.send('test route');
});

module.exports = router;
