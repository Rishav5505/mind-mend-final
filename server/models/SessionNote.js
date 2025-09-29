const mongoose = require("mongoose");

const sessionNoteSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  note: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SessionNote", sessionNoteSchema);
