const router = require('express').Router();
const upload = require('../middleware/upload');
const {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} = require('../controllers/videoController');

// Routes
router.post('/', upload.single('thumbnail'), createTutorial);
router.get('/', getAllTutorials);
router.get('/:id', getTutorialById);
router.patch('/:id', upload.single('thumbnail'), updateTutorial);
router.delete('/:id', deleteTutorial);

module.exports = router;
