const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const templateRoutes = require('./templateRoutes');
const categoryRoutes = require('./categoryRoutes');
const blogRoutes = require('./blogRoutes');
const videoRoutes = require('./videoRoutes');

// Use routes
router.use('/auth', authRoutes);
router.use('/template', templateRoutes);
router.use('/categories', categoryRoutes);
router.use('/blogs', blogRoutes);
router.use('/videos', videoRoutes);

module.exports = router;
