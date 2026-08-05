const express = require('express');
const router = express.Router();
const { getDashboardCards, getDashboardCharts } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/cards', getDashboardCards);
router.get('/charts', getDashboardCharts);

module.exports = router;
