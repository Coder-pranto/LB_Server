const router = require('express').Router();
const upload = require('../middleware/upload');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

// Routes
router.post('/', upload.single('picture'), createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.patch('/:id', upload.single('picture'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
