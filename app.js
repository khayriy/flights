// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- ADD THIS
const app = express();

require('dotenv').config();

// Middleware and Routes
app.use(cors({
  origin: '*', // allow all origins
  credentials: true, // BUT careful: credentials:true + origin:* don't work together
}));
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/flights', require('./routes/flights'));
app.use('/reviews', require('./routes/review'));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo err', err));

module.exports = app;  // Export the app to be used in the serverless function
