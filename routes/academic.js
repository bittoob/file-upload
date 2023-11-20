const express = require('express');
const router = express.Router();

// Include your class route here
const classRoutes = require('./class');

// Academic Home Page
router.get('/', (req, res) => {
  res.render('academic/index');
});

// Other academic routes

// Include the class routes
router.use('/class', classRoutes);

module.exports = router;
