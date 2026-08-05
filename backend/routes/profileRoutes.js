const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadProfilePhoto, uploadResume } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { uploadImage, uploadDocument } = require('../middleware/uploadMiddleware');

router.use(protect);

router.get('/', getProfile);
router.put('/', updateProfile);
router.post('/photo', uploadImage.single('photo'), uploadProfilePhoto);
router.post('/resume', uploadDocument.single('resume'), uploadResume);

module.exports = router;
