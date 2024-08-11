const mongoose = require('mongoose');

// Define Meme Schema
const memeSchema = new mongoose.Schema({
  image: {
    type: Buffer, // Store image data as buffer
    required: true
  },
  tags: {
    type: [String], // Array of tags
    required: true
  },
  mimetype: {
    type: String, // MIME type of the image
    required: true
  }
}, {timestamps: true});

// Create Meme model
const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
