const mongoose = require("mongoose");

const forumMessageSchema = new mongoose.Schema({
  username: { type: String, default: "Anonymous" }, // Future use
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ForumMessage", forumMessageSchema);
