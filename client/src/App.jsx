import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./views/Navbar";
import Footer from "./views/Footer";
import Hero from "./views/Hero";
import About from "./views/About";
import Services from "./views/Services";
import Contact from "./views/Contact";
import Auth from "./views/Auth";
import MoodTracker from "./views/MoodTracker";
import BookTherapy from "./views/BookTherapy";
import SelfHelp from "./views/SelfHelp";
import Emergency from "./views/Emergency";
import Forum from "./views/Forum";
import TherapistDashboard from "./views/TherapistDashboard";
import PatientDashboard from "./views/PatientDashboard";
import Appointments from "./views/Appointments";
import Patients from "./views/Patients";
import Notes from "./views/Notes";
import VideoCall from "./views/VideoCall";
import Chatbot from "./views/Chatbot";
import Payment from "./views/Payment";

import React, { useState, useEffect } from "react";

function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
  {/* Public Pages */}
  <Route path="/" element={<Hero />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="/chatbot" element={<Chatbot />} />
  <Route path="/payment" element={<Payment />} />

        {/* ✅ PATIENT NESTED ROUTES */}
        <Route path="/patient" element={<PatientDashboard />}>
          <Route path="mood" element={<MoodTracker />} />
          <Route path="book" element={<BookTherapy />} />
          <Route path="selfhelp" element={<SelfHelp />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="forum" element={<Forum />} />
          <Route path="chatbot" element={<Chatbot />} />
        </Route>


       {/* ✅ THERAPIST NESTED ROUTES */}
        <Route path="/therapist" element={<TherapistDashboard />}>
          <Route path="appointments" element={<Appointments />} />
          <Route path="manage-patients" element={<Patients />} />
          <Route path="session-notes" element={<Notes />} />
          <Route path="video-call" element={<VideoCall />} />
        
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
