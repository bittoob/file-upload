const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

// Configure Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const indexRoutes = require('./routes/index');
const uploadRoutes = require('./routes/upload');
const academicRoutes = require('./routes/academic'); // Add this line
const classRoutes = require('./routes/class');
const technicalRoutes = require('./routes/technical'); // Add this line

app.use('/', indexRoutes);
app.use('/upload', uploadRoutes);
app.use('/academic', academicRoutes); // Add this line
app.use('/academic/class', classRoutes);
app.use('/technical', technicalRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
