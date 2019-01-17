const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  dailyCalories: {
    type: Number,
    required: true,
    default: 2200
  },
  meals: [
    {
      type: Schema.Types.ObjectId,
      red: 'Meal'
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
