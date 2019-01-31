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
  activeToken: {
    type: String
  },
  dailyCalories: {
    type: Number,
    required: true,
    default: 2200
  }
});

module.exports = mongoose.model('User', UserSchema);
