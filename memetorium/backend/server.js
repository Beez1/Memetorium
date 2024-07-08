const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const sharp = require('sharp'); // Import sharp for image processing
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4201;
const mongoURI = process.env.DATABASE_URL;

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.post('/meme', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Resize and crop image using sharp
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300, fit: 'cover' }) // Adjust dimensions as needed
      .toBuffer();

    const newMeme = await Meme.create({
      image: processedImageBuffer, // Save processed image buffer
      mimetype: req.file.mimetype,
      tags: req.body.tags.split(',').map(x => x.trim())
    });

    res.status(201).json({ message: 'File uploaded successfully', meme: newMeme });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch all memes
app.get('/meme', async (req, res) => {
  try {
    const memes = await Meme.find();
    const formattedMemes = memes.map(meme => ({
      _id: meme._id,
      tags: meme.tags,
      image: `data:${meme.mimetype};base64,${meme.image.toString('base64')}`
    }));
    res.json(formattedMemes);
  } catch (error) {
    console.error('Error fetching memes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
