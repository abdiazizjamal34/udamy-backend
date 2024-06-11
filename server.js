const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Include your routes and middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', require('./routes')); // Adjust the path if necessary

app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);
