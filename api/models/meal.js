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
    type: Number,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Meal', MealSchema);
