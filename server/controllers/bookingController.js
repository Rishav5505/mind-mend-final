const Booking = require("../models/Booking");

// ✅ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { therapistId, date, time } = req.body;
    const userId = req.user.id;

    const booking = new Booking({ user: userId, therapist: therapistId, date, time });
    await booking.save();

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("Booking create error:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

// ✅ Patient's Bookings
exports.getPatientBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("therapist", "_id name email");

    res.json(bookings);
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ✅ Therapist's Bookings
exports.getTherapistBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ therapist: req.user.id })
  .populate("user", "_id name email photoUrl");

    res.json(bookings);
  } catch (err) {
    console.error("Therapist bookings error:", err);
    res.status(500).json({ message: "Failed to fetch therapist bookings" });
  }
};
