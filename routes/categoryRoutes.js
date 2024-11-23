const router = require('express').Router();
const upload = require('../middleware/upload');

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router
  .route('/')
  .get(getAllCategories)
  .post(upload.single('categoryImage'), createCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .patch(upload.single('categoryImage'), updateCategory)
  .delete(deleteCategory);

module.exports = router;
