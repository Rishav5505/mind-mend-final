const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");  // Import http to create the server
const { Server } = require("socket.io"); // Import socket.io

// Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contact");
const moodRoutes = require("./routes/mood");
const bookingRoutes = require("./routes/bookingRoutes");
const forumRoutes = require("./routes/forumRoutes");
const patientRoutes = require("./routes/patientRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const sessionNotesRoutes = require("./routes/sessionNotes");

const app = express();
const server = http.createServer(app); // Wrap express in an HTTP server
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(require("path").join(__dirname, "uploads")));  // Serve uploads folder

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/bookings", bookingRoutes); 
app.use("/api/forum", forumRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/session-notes", sessionNotesRoutes);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "https://mind-mend-final.onrender.com",  // Frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);  // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)  // Use MONGO_URI from environment variables
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("MindMend Backend Running ✅");
});
