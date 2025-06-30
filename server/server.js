const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // 👈 important
const appointmentRoutes = require("./routes/appointmentRoutes");
const moodRoutes = require("./routes/mood");        // ✅
const contactRoutes = require("./routes/contact");  // ✅
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // ✅ Connect auth routes
app.use("/api/appointments", appointmentRoutes);

// MongoDB Connect
mongoose
  .connect("mongodb://localhost:27017/mindmend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
  // Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/contact", contactRoutes);

// Test
app.get("/", (req, res) => {
  res.send("MindMend Backend Running ✅");
});
