const express = require("express");
const router = express.Router();

// Simple chatbot logic (replace with AI logic if needed)

router.post("/", (req, res) => {
  const { message } = req.body;
  let reply = "I am here to help!";

  if (message) {
    const msg = message.toLowerCase();
    if (msg.includes("sad") || msg.includes("depressed") || msg.includes("down")) {
      reply = "I'm sorry you're feeling this way. Remember, it's okay to ask for help. Would you like some self-help tips or to talk to a therapist?";
    } else if (msg.includes("happy") || msg.includes("good") || msg.includes("great")) {
      reply = "That's wonderful! Keep focusing on what makes you feel good. Want to share what's making you happy?";
    } else if (msg.includes("anxious") || msg.includes("anxiety") || msg.includes("nervous")) {
      reply = "Anxiety can be tough. Try some deep breathing or check our Self-Help Library for relaxation exercises.";
    } else if (msg.includes("help") || msg.includes("support") || msg.includes("emergency")) {
      reply = "If you need urgent help, please use the Emergency section. For general support, you can book a session or try our community forum.";
    } else if (msg.includes("book") || msg.includes("appointment") || msg.includes("therapist")) {
      reply = "You can book a therapy session from the Book Therapy section. Would you like the link?";
    } else if (msg.includes("stress") || msg.includes("tired") || msg.includes("burnout")) {
      reply = "Stress is common. Try taking a short break, or explore our Self-Help Library for stress relief tips.";
    } else if (msg.includes("thank")) {
      reply = "You're welcome! I'm always here to support you.";
    } else if (msg.includes("bye") || msg.includes("goodbye")) {
      reply = "Take care! Remember, you can chat with me anytime.";
    } else {
      reply = "Thank you for sharing. Would you like some self-help resources, or to talk to a professional?";
    }
  }

  res.json({ reply });
});

module.exports = router;
