const nodemailer = require("nodemailer");
require("dotenv").config();


// Always send OTP to the user's signup email (to)
const sendMail = async ({ to, subject, text }) => {
  console.log(`Sending OTP to: ${to}`);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Gmail only allows sending from authenticated user
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
