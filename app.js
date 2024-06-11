const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const paymentRouter = require('./routes/pyment');
const path = require('path');

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, etc.)
  optionsSuccessStatus: 204 // For legacy browser support
};

app.use(cors(corsOptions)); // Use cors middleware with options
console.log('corsOptions', corsOptions);
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use auth middleware if required
// app.use(authMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/payments', paymentRouter);

module.exports = app;
