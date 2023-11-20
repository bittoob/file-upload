// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const File = require('../models/file.model'); 

// // Define storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Extract the path from the request URL
//     const urlPath = req.body.urlPath; // Make sure to pass the URL path as a parameter
    
//     // Create the destination path based on the URL
//     const uploadDir = 'public/uploads' + urlPath;

//     // Create the directory if it doesn't exist
//     fs.mkdir(uploadDir, { recursive: true }, (err) => {
//       if (err) {
//         return cb(err, null);
//       }
//       cb(null, uploadDir);
//     });
//   },
//   filename: (req, file, cb) => {
//     const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
//     cb(null, filename);
//   },
// });

// // Initialize multer upload with the defined storage
// const upload = multer({ storage });

// router.post('/*', upload.single('file'), async (req, res) => {
//   if (req.file) {
//     // The file was uploaded successfully
//     const { filename, originalname, path, size } = req.file;

//     // Create a new record in the database for the uploaded file
//     try {
//       // Initialize the File model
//       const file = new File({ filename, originalname, path, size });

//       // Set the location to the relative path
//       file.location = `/uploads/${filename}`;

//       // Save the file details to MongoDB
//       await file.save();

//       res.send('File uploaded successfully.');
//     } catch (error) {
//       res.status(500).send('Error saving the file details in the database.');
//     }
//   } else {
//     // No file was selected
//     res.status(400).send('No file selected.');
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/file.model');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Extract the class, subject, and topic from the request body
    const selectedClass = req.body.class;
    const selectedSubject = req.body.subject;
    const selectedTopic = req.body.topic;

    if (!selectedClass || !selectedSubject || !selectedTopic) {
      return cb(new Error('Missing class, subject, or topic information'), null);
    }

    // Create the destination path based on the user's selection
    const uploadDir = `public/uploads/${selectedClass}/${selectedSubject}/${selectedTopic}`;

    // Create the directory if it doesn't exist
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

// Initialize multer upload with the defined storage
const upload = multer({ storage });

router.post('/*', upload.single('file'), async (req, res) => {
  if (req.file) {
    // The file was uploaded successfully
    const { filename, originalname, path, size } = req.file;

    // Create a new record in the database for the uploaded file
    try {
      // Initialize the File model
      const file = new File({ filename, originalname, path, size });

      // Set the location to the relative path
      file.location = `/uploads/${filename}`;

      // Save the file details to MongoDB
      await file.save();

      res.send('File uploaded successfully.');
    } catch (error) {
      res.status(500).send('Error saving the file details in the database.');
    }
  } else {
    // No file was selected
    res.status(400).send('No file selected.');
  }
});

module.exports = router;

