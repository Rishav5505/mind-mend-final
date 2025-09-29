const User = require("../models/User");
const path = require("path");

// Update patient profile photo
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const userId = req.params.id;
    const photoUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      userId,
      { photoUrl },
      { new: true }
    ).select("_id name email photoUrl");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Photo uploaded", user });
  } catch (err) {
    console.error("Photo upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
