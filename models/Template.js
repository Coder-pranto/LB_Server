const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  driveFileId: String,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Template', templateSchema);
