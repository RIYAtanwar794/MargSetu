const express = require("express");
const router = express.Router();

const {
    getAnalytics,
    getInsights,
} = require("../controllers/analyticsController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

// Dashboard Analytics
router.get("/", getAnalytics);

// AI Insights
router.get("/insights", getInsights);

module.exports = router;
