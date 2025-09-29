const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contact");
const moodRoutes = require("./routes/mood");        // ✅
const bookingRoutes = require("./routes/bookingRoutes"); // ✅ add this at top

const forumRoutes = require("./routes/forumRoutes"); // ✅ CommonJS syntax
const patientRoutes = require("./routes/patientRoutes");  // ✅ ADD THIS
const chatbotRoutes = require("./routes/chatbotRoutes");
const sessionNotesRoutes = require("./routes/sessionNotes");


const app = express();
const server = http.createServer(app); // ✅ wrap express in HTTP server
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploads folder for profile images
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/bookings", bookingRoutes); // ✅ register route

app.use("/api/forum", forumRoutes);
app.use("/api/patients", patientRoutes);  // ✅ ADD THIS
app.use("/api/chatbot", chatbotRoutes); // 👈 Add chatbot route
app.use("/api/session-notes", sessionNotesRoutes); // 👈 Add session notes route

// ✅ Socket.IO Setup 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ✅ Connect MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
