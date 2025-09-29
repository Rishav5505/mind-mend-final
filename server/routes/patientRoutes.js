
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
    const bookings = await Booking.find({ therapist: therapistId });
    if (!bookings || bookings.length === 0) {
      return res.json([]);
    }
    const patientIds = [...new Set(bookings.map(b => b.user.toString()))];
    const patients = await User.find({
      _id: { $in: patientIds }
    }).select("name email createdAt photoUrl");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
