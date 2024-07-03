const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4200;
const mongoURI = process.env.DATABASE_URL;

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Import Meme model
const Meme = require('./models/meme'); // Adjust the path as per your project structure

// API endpoint to handle file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { buffer } = req.file;
    const { tags } = req.body;

    // Create a new Meme document
    const newMeme = new Meme({
      image: buffer,
      tags,
    });

    // Save the Meme document to the database
    await newMeme.save();

    res.status(201).json({ message: 'File uploaded successfully', meme: newMeme });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
