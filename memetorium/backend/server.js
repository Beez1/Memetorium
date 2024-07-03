const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4200;
const mongoURI = process.env.DATABASE_URL;

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the useCreateIndex option as it's deprecated
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Multer setup for file upload
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define Mongoose Schema and Model for Meme
const MemeSchema = new mongoose.Schema({
  fileBuffer: { type: Buffer, required: true },
  fileType: { type: String, required: true },
  tags: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

const Meme = mongoose.model('Meme', MemeSchema);

// API endpoint to handle file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const tags = req.body.tags;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Save file metadata to MongoDB
  const meme = new Meme({
    fileBuffer: file.buffer,
    fileType: file.mimetype,
    tags: tags
  });

  meme.save()
    .then(() => {
      res.status(201).json({ message: 'File uploaded successfully', file: file, tags: tags });
    })
    .catch(err => {
      console.error('Error saving file metadata', err);
      res.status(500).json({ message: 'Error saving file metadata', error: err });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
