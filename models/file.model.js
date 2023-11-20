const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  size: Number,
  location: String,
  
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
