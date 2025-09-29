// routes/mood.js
const express = require("express");
const router = express.Router();

// ✅ 1.  middleware import
const requireAuth = require("../middleware/auth");

const { addMood, getMoods } = require("../controllers/moodcontroller");

// ✅ 2.  protect all mood routes
router.use(requireAuth);

// GET  /api/mood  → list moods
router.get("/", getMoods);

// POST /api/mood  → add new mood
router.post("/", addMood);

module.exports = router;
