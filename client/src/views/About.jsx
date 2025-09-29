import { motion } from "framer-motion"; // For animations
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-purple-200 py-12">
      <div className="max-w-screen-xl mx-auto text-center px-6">
        <motion.h2
          className="text-4xl font-bold text-purple-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About MindMend
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 mb-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          MindMend is a modern platform designed to bridge the gap between individuals and mental health professionals. 
          Our mission is to provide stigma-free, accessible mental wellness tools, including therapy bookings, 
          AI-powered mood tracking, and community support — all in one place.
        </motion.p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Secure Logins */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl text-center transform transition-transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            onClick={() => navigate("/auth")}
            title="Go to Login/Signup"
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4 inline-block">
              <i className="fas fa-lock text-3xl text-purple-700"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-purple-800">Secure Logins</h3>
            <p className="text-gray-600">Separate dashboards for therapists and patients using JWT & OAuth.</p>
          </motion.div>

          {/* Therapy Booking */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl text-center transform transition-transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.7 }}
            onClick={() => navigate("/patient/book")}
            title="Book Therapy Session"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4 inline-block">
              <i className="fas fa-calendar-check text-3xl text-blue-700"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-800">Therapy Booking</h3>
            <p className="text-gray-600">Users can easily schedule and manage therapy sessions.</p>
          </motion.div>

          {/* Mood Tracking */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl text-center transform transition-transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.9 }}
            onClick={() => navigate("/patient/mood")}
            title="Track Your Mood"
          >
            <div className="bg-green-100 p-4 rounded-full mb-4 inline-block">
              <i className="fas fa-chart-line text-3xl text-green-700"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-green-800">Mood Tracking</h3>
            <p className="text-gray-600">AI detects patterns and suggests wellness tips.</p>
          </motion.div>

          {/* Self-Help Library */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl text-center transform transition-transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            onClick={() => navigate("/patient/selfhelp")}
            title="Open Self-Help Library"
          >
            <div className="bg-yellow-100 p-4 rounded-full mb-4 inline-block">
              <i className="fas fa-book-open text-3xl text-yellow-700"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-yellow-800">Self-Help Library</h3>
            <p className="text-gray-600">Access curated videos, readings, and meditation exercises.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
