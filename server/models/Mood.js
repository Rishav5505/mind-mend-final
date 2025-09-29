/* server/models/Mood.js */
const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
      type: String,
      enum: ["Happy", "Sad", "Stressed", "Angry", "Relaxed"],
      required: true,
    },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);
