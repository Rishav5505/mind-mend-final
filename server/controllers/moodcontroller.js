/* server/controllers/moodController.js */
const Mood = require("../models/Mood");

exports.addMood = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const userId = req.user.id;      // auth middleware sets req.user
    const newMood = await Mood.create({ mood, note, user: userId });
    res.status(201).json(newMood);
  } catch (err) {
    console.error("Add Mood error:", err);
    res.status(500).json({ message: "Could not save mood", error: err.message });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const moods = await Mood.find({ user: userId }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    console.error("Get Moods error:", err);
    res.status(500).json({ message: "Failed to fetch moods" });
  }
};
