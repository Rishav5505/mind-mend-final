
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const patientController = require("../controllers/patientController");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Upload patient profile photo
router.post("/:id/photo", upload.single("photo"), patientController.uploadPhoto);

// ✅ Therapist ke sare patients
router.get("/by-therapist/:therapistId", async (req, res) => {
  try {
    const therapistId = req.params.therapistId;
    console.log("➡ Therapist ID:", therapistId);
    const bookings = await Booking.find({ therapist: therapistId });
    console.log("📒 Bookings found:", bookings.length);
    if (!bookings || bookings.length === 0) {
      console.log("⚠️ No bookings found for therapist.");
      return res.json([]);
    }
    const patientIds = [...new Set(bookings.map(b => b.user.toString()))];
    console.log("🆔 Patient IDs:", patientIds);
    const patients = await User.find({
      _id: { $in: patientIds }
    }).select("name email createdAt photoUrl");
    console.log("👥 Patients found:", patients.length);
    res.json(patients);
  } catch (error) {
    console.error("❌ Server error in /by-therapist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
