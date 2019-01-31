const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlacklistSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now()
  }
});

module.exports = mongoose.model('Blacklist', BlacklistSchema);
