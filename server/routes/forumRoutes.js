const express = require("express");
const router = express.Router();
const ForumMessage = require("../models/ForumMessage");

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await ForumMessage.find().sort({ createdAt: -1 }).limit(50);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
