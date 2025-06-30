const router = require("express").Router();
const Appointment = require("../models/Appointment");

// Therapist - Get all their appointments
router.get("/therapist/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({ therapistId: req.params.id }).populate("patientId", "name email");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});
