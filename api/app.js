const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const mealRoutes = require('./routes/meal');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${
  process.env.MONGO_DB_PASSWORD
}@calories-cluster-yphyj.mongodb.net/default?retryWrites=true`;

app.use(bodyParser.json());

// Routes.
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use(mealRoutes);

// Initial catch all. Should be 404.
app.use('*', (req, res, next) => {
  res.json({
    message: 'Hello world!'
  });
});

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 3001);
  })
  .catch(error => {
    console.log(error);
  });
