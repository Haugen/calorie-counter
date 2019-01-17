const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const mealRoutes = require('./routes/meal');

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

app.listen(3001);
