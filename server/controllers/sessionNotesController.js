const SessionNote = require("../models/SessionNote");

// Add a new session note
exports.addNote = async (req, res) => {
  try {
    const { patientId, note } = req.body;
    const therapistId = req.user.id;
    const newNote = new SessionNote({
      therapist: therapistId,
      patient: patientId,
      note,
    });
    await newNote.save();
    res.status(201).json({ message: "Note added", note: newNote });
  } catch (err) {
    console.error("Add note error:", err);
    res.status(500).json({ message: "Failed to add note" });
  }
};

// Get all notes for a therapist
exports.getNotes = async (req, res) => {
  try {
    const therapistId = req.user.id;
    const notes = await SessionNote.find({ therapist: therapistId }).populate("patient", "name email");
    res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};
