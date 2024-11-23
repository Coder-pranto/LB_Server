const Category = require('../models/Category');
const { deleteFile } = require('../utils/helper');
const path = require('path');


// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Category image is required' });
  }

  const categoryImage = req.file.filename;

  const category = new Category({
    name,
    description,
    categoryImage,
  });
  await category.save();
  res.status(201).json({ message: 'Category created successfully', category });
};

// Get all categories
const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
};

// Get single category
const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json({ category });
};

// Update a category
const updateCategory = async (req, res) => {

    const { name, description } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update only the fields provided by the user
    if (name) category.name = name;
    if (description) category.description = description;

    if (req.file) {
      // Delete the old image if a new image is provided
      const oldImagePath = path.join(
        __dirname,
        '../uploads',
        category.categoryImage
      );
      deleteFile(oldImagePath);

      category.categoryImage = req.file.filename;
    }

    await category.save();
    res
      .status(200)
      .json({ message: 'Category updated successfully', category });
};


// Delete a category
const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  // Delete the image
  const imagePath = path.join(__dirname, '../uploads', category.categoryImage);
  deleteFile(imagePath);

  await Category.findByIdAndDelete(category._id);

  res.status(204).json({ message: 'Category deleted successfully' });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};