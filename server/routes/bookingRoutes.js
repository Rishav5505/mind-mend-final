const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createBooking,
  getPatientBookings,
  getTherapistBookings,
} = require("../controllers/bookingController");

router.post("/", auth, createBooking);               // For patient booking
router.get("/", auth, getPatientBookings);           // Patient booking list
router.get("/therapist", auth, getTherapistBookings); // ✅ Therapist dashboard view

module.exports = router;
