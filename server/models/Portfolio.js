const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  data: { type: Object, required: true }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);