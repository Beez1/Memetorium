const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(express.json());
app.listen(1000, () => {
    console.log('Server is running');
});

database.on('error', (error) => {
    console.log('Error connecting to database', error);
});


database.once('connected', () => {
    console.log('db connected');
});
