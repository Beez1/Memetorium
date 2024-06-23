const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const app = express();

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(uri)
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error('Database connection error:', err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
