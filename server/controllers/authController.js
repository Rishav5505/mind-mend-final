const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = new User({ name, email, password: hashedPassword, role, otp, otpVerified: false });
    await newUser.save();

    // Send OTP email
    await sendMail({
      to: email,
      subject: "MindMend Signup OTP",
      text: `Your OTP for MindMend signup is: ${otp}`,
    });

    res.status(201).json({
      message: "Signup successful. OTP sent to email.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        otpVerified: false,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.otpVerified) {
      return res.status(403).json({ message: "Email not verified. Please verify OTP sent to your email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

// Verify OTP endpoint
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    if (user.otpVerified)
      return res.status(400).json({ message: "Email already verified" });
    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    user.otpVerified = true;
    user.otp = undefined;
    await user.save();
    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err });
  }
};

// ✅ List therapists
exports.listTherapists = async (req, res) => {
  try {
    const therapists = await User.find({ role: "therapist" }).select("name _id email");
    res.json(therapists);
  } catch (err) {
    console.error("Fetch therapists error:", err);
    res.status(500).json({ message: "Failed to fetch therapists" });
  }
};
