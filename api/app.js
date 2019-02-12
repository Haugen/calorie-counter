const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const mealRoutes = require('./routes/meal');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${
  process.env.MONGO_DB_PASSWORD
}@calories-cluster-yphyj.mongodb.net/default?retryWrites=true`;

app.use(bodyParser.json());

// Middleware to set some necessary headers.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// Use helmet to set and/or remove additional headers.
app.use(helmet());

// Use morgan for logging.
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Routes.
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use(mealRoutes);

// Catch all 404.
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Nothing found here!'
  });
});

// Default error handler.
app.use('*', (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.toString()
  });
});

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 3001);
  })
  .catch(error => {
    console.log(error);
  });
