const mongoose = require('mongoose');

const YouTubeTutorialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tutorial name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  videoLink: {
    type: String,
    required: [true, 'YouTube video link is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('YouTubeTutorial', YouTubeTutorialSchema);
