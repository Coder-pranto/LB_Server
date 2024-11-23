const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  templateId: mongoose.Schema.Types.ObjectId,
  driveFileId: String,
  accessToken: String,
  expiresAt: Date,
});

module.exports = mongoose.model('Purchase', purchaseSchema);
