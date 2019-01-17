const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Meal', MealSchema);
