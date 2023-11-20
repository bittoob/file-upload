const express = require('express');
const router = express.Router();

// Define routes for the technical section
router.get('/', (req, res) => {
  res.send('Welcome to the Technical section.');
});

module.exports = router;
