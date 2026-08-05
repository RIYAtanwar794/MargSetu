const express = require('express');
const router = express.Router();
const { chatWithMentor, getMentorHistory, clearMentorHistory } = require('../controllers/mentorController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/chat', chatWithMentor);
router.get('/history', getMentorHistory);
router.delete('/history', clearMentorHistory);

module.exports = router;
