const Blog = require('../models/Blog');
const Category = require('../models/Category');
const { deleteFile } = require('../utils/helper');
const path = require('path');

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Blog picture is required' });
  }

  const blogPicture = req.file.filename;

  // Verify category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const blog = new Blog({
    title,
    picture: blogPicture,
    content,
    category,
  });

  await blog.save();
  res.status(201).json({ message: 'Blog created successfully', blog });
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate('category', 'name') // Populate category name
    .sort({ timestamp: -1 }); // Sort by latest
  res.status(200).json({ blogs });
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('category', 'name');
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  res.status(200).json({ blog });
};

// Update a blog
const updateBlog = async (req, res) => {
  const { title, content, category } = req.body;

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Verify category if provided
  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }
    blog.category = category;
  }

  // Update fields if provided
  if (title) blog.title = title;
  if (content) blog.content = content;

  if (req.file) {
    // Delete old picture
    const oldImagePath = path.join(__dirname, '../uploads', blog.picture);
    deleteFile(oldImagePath);

    blog.picture = req.file.filename;
  }

  await blog.save();
  res.status(200).json({ message: 'Blog updated successfully', blog });
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Delete the blog picture
  const imagePath = path.join(__dirname, '../uploads', blog.picture);
  deleteFile(imagePath);

  await Blog.findByIdAndDelete(blog._id);

  //   res.status(204).json({ message: 'Blog deleted successfully' }); //When you use a 204 No Content status, the HTTP standard specifies that the response body must be empty. Hence, the message you are trying to send will not be displayed
  res.status(200).json({ message: 'Blog deleted successfully' });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
