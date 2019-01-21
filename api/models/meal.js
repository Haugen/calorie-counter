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
    required: false
  },
  time: {
    type: Date,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    red: 'User'
  }
});

module.exports = mongoose.model('Meal', MealSchema);
