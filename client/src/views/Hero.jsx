import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../assets/bg1.jpg";
import img2 from "../assets/bg2.jpg";
import img3 from "../assets/bg3.jpg";
import img4 from "../assets/bg4.jpg"
import img5 from "../assets/bg5.jpg"
import img6 from "../assets/bg6.jpg"
import img7 from "../assets/bg7.jpg"
import img8 from "../assets/bg8.jpg"
import img9 from "../assets/bg9.jpg"
import img10 from "../assets/bg10.jpg"

const images = [img1, img2, img3 , img4, img5, img6, img7, img8, img9, img10];

const Hero = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>

      <section
        className="min-h-screen relative flex flex-col justify-center items-center px-4 py-20 text-center bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[bgIndex]})`,
        }}
      >
  {/* Subtle dark overlay for readability */}
  <div className="absolute inset-0 bg-black/40"></div>
  {/* Softer animated gradient overlay for style, but more transparent */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-blue-500/20 to-pink-400/20 animate-gradient-move pointer-events-none"></div>
  {/* Hero card without blur */}
  <div className="relative z-10 max-w-2xl w-full bg-white/10 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-white/20">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight tracking-tight mb-4"
            style={{letterSpacing: "-0.03em"}}
          >
            <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-blue-200 bg-clip-text text-transparent">MindMend</span><br/>
            <span className="text-white/90">Nurturing Mental Wellness</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-lg md:text-2xl text-white/80 max-w-xl font-medium"
          >
            Empower your mind with <span className="text-purple-200 font-bold">AI tools</span>, expert guidance, and a caring community.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.09, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/contact")}
            className="mt-10 flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:from-purple-700 hover:to-blue-600 transition text-lg tracking-wide border-2 border-white/20 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200"
          >
            <span className="text-xl">🚀</span> Get Started
          </motion.button>
        </div>
      </section>

      {/* Why Choose MindMend Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-100 py-20 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-14 tracking-tight drop-shadow-lg">
          Why Choose <span className="text-blue-600">MindMend?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Confidential Therapy",
              desc: "Private, secure sessions with licensed professionals.",
              icon: "💬",
              color: "from-purple-400 to-purple-600",
              route: "/patient/book"
            },
            {
              title: "Easy Booking",
              desc: "Simple scheduling with flexible time slots.",
              icon: "📅",
              color: "from-blue-400 to-blue-600",
              route: "/patient/book"
            },
            {
              title: "AI Mood Insights",
              desc: "Smart mood tracking and personalized suggestions.",
              icon: "🧠",
              color: "from-pink-400 to-pink-600",
              route: "/patient/mood"
            },
          ].map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.09, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(item.route)}
              className={`w-full bg-white/80 p-8 rounded-3xl shadow-xl border border-white/30 transition cursor-pointer hover:shadow-2xl hover:bg-gradient-to-br ${item.color} flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-purple-200`}
              style={{ minHeight: 220 }}
            >
              <span className="text-5xl mb-5 drop-shadow-lg">{item.icon}</span>
              <span className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">{item.title}</span>
              <span className="text-gray-600 text-lg font-medium">{item.desc}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
