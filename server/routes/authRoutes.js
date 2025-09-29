const express = require("express");
const router = express.Router();
const { signup, login, listTherapists, verifyOtp } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/therapists", listTherapists);
router.post("/verify-otp", verifyOtp); // ✅ OTP verification

module.exports = router;
