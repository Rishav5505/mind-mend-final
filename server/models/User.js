const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "therapist"], required: true },
  photoUrl: { type: String }, // Profile photo URL
  otp: { type: String }, // OTP for email verification
  otpVerified: { type: Boolean, default: false }, // Email verified status
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
