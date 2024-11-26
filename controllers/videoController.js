const YouTubeTutorial = require('../models/Video');
const { deleteFile } = require('../utils/helper');
const path = require('path');

// Create a new tutorial
const createTutorial = async (req, res) => {
  const { name, videoLink, status } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Thumbnail is required' });
  }

  const thumbnail = req.file.filename;

  const tutorial = new YouTubeTutorial({
    name,
    videoLink,
    thumbnail,
    status,
  });

  await tutorial.save();
  res.status(201).json({ message: 'Tutorial created successfully', tutorial });
};

// Get all tutorials
const getAllTutorials = async (req, res) => {
  const tutorials = await YouTubeTutorial.find().sort({ timestamp: -1 });
  res.status(200).json({ tutorials });
};

// Get a tutorial by ID
const getTutorialById = async (req, res) => {
  const tutorial = await YouTubeTutorial.findById(req.params.id);
  if (!tutorial) {
    return res.status(404).json({ message: 'Tutorial not found' });
  }
  res.status(200).json({ tutorial });
};

// Update a tutorial
const updateTutorial = async (req, res) => {
  const { name, videoLink, status } = req.body;

  const tutorial = await YouTubeTutorial.findById(req.params.id);
  if (!tutorial) {
    return res.status(404).json({ message: 'Tutorial not found' });
  }

  // Update fields if provided
  if (name) tutorial.name = name;
  if (videoLink) tutorial.videoLink = videoLink;
  if (status) tutorial.status = status;

  if (req.file) {
    // Delete old thumbnail
    const oldImagePath = path.join(__dirname, '../uploads', tutorial.thumbnail);
    deleteFile(oldImagePath);

    tutorial.thumbnail = req.file.filename;
  }

  await tutorial.save();
  res.status(200).json({ message: 'Tutorial updated successfully', tutorial });
};

// Delete a tutorial
const deleteTutorial = async (req, res) => {
  const tutorial = await YouTubeTutorial.findById(req.params.id);

  if (!tutorial) {
    return res.status(404).json({ message: 'Tutorial not found' });
  }

  // Delete the thumbnail
  const imagePath = path.join(__dirname, '../uploads', tutorial.thumbnail);
  deleteFile(imagePath);

  await YouTubeTutorial.findByIdAndDelete(tutorial._id);
  res.status(200).json({ message: 'Tutorial deleted successfully' });
};

module.exports = {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
};
