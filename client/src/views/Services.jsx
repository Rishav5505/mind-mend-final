import { motion } from "framer-motion"; // For animations
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
const Services = () => {
  const navigate = useNavigate();
  // Local theme state for this page
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const bgClass = theme === "dark"
    ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200";
  const cardBase = theme === "dark"
    ? "bg-gray-900 text-gray-100 border border-gray-700 hover:bg-gray-800"
    : "bg-white text-gray-800 hover:bg-purple-50";
  const cardBlue = theme === "dark" ? "hover:bg-blue-900" : "hover:bg-blue-50";
  const cardGreen = theme === "dark" ? "hover:bg-green-900" : "hover:bg-green-50";
  const cardRed = theme === "dark" ? "hover:bg-red-900" : "hover:bg-red-50";
  const cardYellow = theme === "dark" ? "hover:bg-yellow-900" : "hover:bg-yellow-50";
  const cardTeal = theme === "dark" ? "hover:bg-teal-900" : "hover:bg-teal-50";
  const themeIcon = theme === "dark"
    ? <span className="text-4xl">🌙</span>
    : <span className="text-4xl">☀️</span>;
  return (
    <div className={`${bgClass} py-12`}>
      <div className="max-w-screen-xl mx-auto text-center px-6">
        <motion.h2
          className={`text-4xl font-bold mb-10 ${theme === "dark" ? "text-purple-300" : "text-purple-700"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Services
        </motion.h2>

  {/* Services Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {/* 1:1 Counseling */}
          <motion.div
            className={`${cardBase} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            onClick={() => navigate("/patient/book")}
            title="Book 1:1 Counseling"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-purple-900" : "bg-purple-100"}`}>
              <i className={`fas fa-user-md text-4xl ${theme === "dark" ? "text-purple-300" : "text-purple-700"}`}></i>
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-purple-200" : "text-purple-800"}`}>1:1 Counseling</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Talk with licensed therapists privately online and get mental clarity.</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Expert therapists available anytime for mental clarity, stress management, and emotional support.</p>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div
            className={`${cardBase} ${cardBlue} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.7 }}
            onClick={() => navigate("/patient/mood")}
            title="Track Your Mood"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-blue-900" : "bg-blue-100"}`}>
              <i className={`fas fa-chart-line text-4xl ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}></i>
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-blue-200" : "text-blue-800"}`}>Mood Tracker</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Monitor your daily mood patterns and emotional trends over time.</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Track mood fluctuations, emotional trends, and mental health insights over time with AI-driven analytics.</p>
          </motion.div>

          {/* Meditation Guide */}
          <motion.div
            className={`${cardBase} ${cardGreen} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.9 }}
            onClick={() => navigate("/patient/selfhelp")}
            title="Open Meditation Guide"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-green-900" : "bg-green-100"}`}>
              <i className={`fas fa-spa text-4xl ${theme === "dark" ? "text-green-300" : "text-green-700"}`}></i>
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-green-200" : "text-green-800"}`}>Meditation Guide</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Access guided meditation and mindfulness exercises anytime.</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Relax your mind and body through guided meditation, breathing exercises, and mindfulness practices.</p>
          </motion.div>

          {/* Video Therapy */}
          <motion.div
            className={`${cardBase} ${cardRed} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            onClick={() => navigate("/therapist/video-call")}
            title="Start Video Therapy"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-red-900" : "bg-red-100"}`}>
              <i className={`fas fa-video text-4xl ${theme === "dark" ? "text-red-300" : "text-red-700"}`}></i>
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-red-200" : "text-red-800"}`}>Video Therapy</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Engage in real-time video sessions with your therapist for a more personalized experience.</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Talk face-to-face with certified therapists through secure video calls.</p>
          </motion.div>

          {/* Support Groups */}
          <motion.div
            className={`${cardBase} ${cardYellow} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2 }}
            onClick={() => navigate("/patient/forum")}
            title="Join Support Groups"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-yellow-900" : "bg-yellow-100"}`}>
              <i className={`fas fa-users text-4xl ${theme === "dark" ? "text-yellow-300" : "text-yellow-700"}`}></i>
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-yellow-200" : "text-yellow-800"}`}>Support Groups</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Join anonymous support groups and connect with peers facing similar challenges.</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Access moderated forums where you can share experiences, advice, and support.</p>
          </motion.div>

          {/* Wellness Tips */}
          <motion.div
            className={`${cardBase} ${cardTeal} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4 }}
            onClick={() => navigate("/patient/selfhelp")}
            title="Get Wellness Tips"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-teal-900" : "bg-teal-100"}`}>
              <i className={`fas fa-balance-scale text-4xl ${theme === "dark" ? "text-teal-300" : "text-teal-700"}`}></i>
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-teal-200" : "text-teal-800"}`}>Wellness Tips</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Get personalized wellness tips based on your mood and behavior patterns.</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Receive daily wellness suggestions, including relaxation techniques and self-care practices.</p>
          </motion.div>

          {/* Theme Switcher Card */}
          <motion.div
            className={`${cardBase} p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.6 }}
            title="Switch Theme"
          >
            <div className={`p-4 rounded-full mb-4 inline-block ${theme === "dark" ? "bg-gray-800" : "bg-yellow-100"}`}>
              {themeIcon}
            </div>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-yellow-200" : "text-yellow-700"}`}>Theme Switcher</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Toggle between Light and Dark mode for a personalized experience.</p>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`mt-2 px-6 py-3 rounded-full border-2 font-bold shadow-sm transition-all flex items-center gap-2 ${theme === "dark" ? "bg-gray-800 border-yellow-400 text-yellow-200 hover:bg-gray-700" : "bg-white border-yellow-300 text-yellow-700 hover:bg-yellow-100"}`}
              style={{ fontSize: "1.1rem" }}
            >
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
