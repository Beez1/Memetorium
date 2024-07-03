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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Meme model
const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
