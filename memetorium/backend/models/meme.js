const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({
  fileBuffer: {
    type: Buffer,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Meme', MemeSchema);