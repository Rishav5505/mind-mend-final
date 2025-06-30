const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Set up transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,     // your Gmail
      pass: process.env.EMAIL_PASS,     // your Gmail App Password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // receive messages at your own email
    subject: `New Contact Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
});

module.exports = router;
