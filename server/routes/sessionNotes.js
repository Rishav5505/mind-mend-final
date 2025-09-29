const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addNote, getNotes } = require("../controllers/sessionNotesController");

router.post("/", auth, addNote); // Add a new note
router.get("/", auth, getNotes); // Get all notes for therapist

module.exports = router;
