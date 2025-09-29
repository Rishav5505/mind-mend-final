const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createBooking,
  getPatientBookings,
  getTherapistBookings, // 👈 add this
} = require("../controllers/bookingController");

router.post("/", auth, createBooking);
router.get("/", auth, getPatientBookings);
router.get("/therapist", auth, getTherapistBookings); // ✅ correct route

module.exports = router;
