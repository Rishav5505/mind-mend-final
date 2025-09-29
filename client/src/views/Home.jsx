import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Background Images
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

function Home() {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // FAQ data
  const faqList = [
    {
      q: "Is MindMend confidential?",
      a: "Absolutely! All your data and conversations are encrypted and private.",
    },
    {
      q: "How do I book a therapy session?",
      a: "Just click on 'Book Therapy', choose your therapist, and select a time slot.",
    },
    {
      q: "Can I use MindMend on mobile?",
      a: "Yes, MindMend is fully responsive and works great on all devices.",
    },
    {
      q: "What is the Mood Tracker?",
      a: "It's an AI-powered tool to help you track your emotional wellbeing and get personalized tips.",
    },
    {
      q: "Is there a community for support?",
      a: "Yes! Join our forum to connect with others and share experiences.",
    },
  ];
  return (
    <>
      {/* ✅ Hero Section */}
      <motion.section
        className="min-h-screen relative flex flex-col justify-center items-center px-4 py-20 text-center bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[bgIndex]})`,
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-blue-500/40 to-pink-400/40 animate-gradient-move"></div>
        {/* Glassmorphism Card */}
        <div className="relative z-10 max-w-2xl w-full mx-auto backdrop-blur-lg bg-white/20 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-white/30">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 animate-gradient-text"
            style={{ backgroundSize: '200% 200%' }}
          >
            Nurturing Mental Wellness <br className="hidden md:inline" /> Through Technology
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow"
          >
            Empower your mind with tools, guidance, and a caring community.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/contact")}
            className="mt-8 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 border-2 border-white/30"
          >
            Get Started
          </motion.button>
        </div>
        {/* Floating SVG shapes for extra modern look */}
        <svg className="absolute left-10 top-20 w-24 h-24 opacity-30 animate-float" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#a78bfa" /></svg>
        <svg className="absolute right-10 bottom-20 w-20 h-20 opacity-30 animate-float" viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" rx="20" fill="#38bdf8" /></svg>
        {/* Floating Chatbot Button */}
        <button
          onClick={() => navigate('/patient/chatbot')}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg px-6 py-4 font-bold text-lg hover:scale-105 transition-all flex items-center gap-2 animate-bounce"
        >
          <span role="img" aria-label="Chatbot">🤖</span> Chatbot
        </button>
  </motion.section>

      {/* ✅ Why Choose MindMend Section */}
      <motion.section
        className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16 px-4 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mb-12 drop-shadow-lg">
          Why Choose MindMend?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Confidential Therapy",
              desc: "Talk to licensed professionals in a secure, judgment-free space.",
              icon: "💬",
            },
            {
              title: "Easy Booking",
              desc: "Book therapy sessions with just a few clicks, anytime.",
              icon: "📅",
            },
            {
              title: "AI Mood Insights",
              desc: "Track your mood and get AI-driven insights and tips.",
              icon: "🧠",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-purple-200/40 flex flex-col items-center"
            >
              <div className="text-5xl mb-4 drop-shadow-lg">{item.icon}</div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
  </motion.section>

      {/* Testimonial Carousel */}
      <motion.section
        className="py-12 px-4 bg-white/60 backdrop-blur-lg"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-8">What Our Users Say</h2>
        <TestimonialCarousel />
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-14 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 backdrop-blur-lg"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mb-8 drop-shadow-lg">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto grid gap-8">
          {faqList.map((faq, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white/70 rounded-2xl shadow-lg p-6 border border-purple-100 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <span className="text-xl">❓</span> {faq.q}
              </h3>
              <p className="text-gray-700 font-medium">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

function TestimonialCarousel() {
  const testimonials = [
    {
      name: "Aarav S.",
      text: "MindMend helped me find the right therapist and track my mood. The platform is super easy and feels safe!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya K.",
      text: "Booking sessions is so simple, and the community is very supportive. Highly recommend MindMend!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul T.",
      text: "The AI mood tracker gives me insights I never thought about. Love the design and features!",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-purple-100">
        <img src={testimonials[index].avatar} alt={testimonials[index].name} className="w-16 h-16 rounded-full mb-4 shadow" />
        <p className="text-lg text-gray-700 italic mb-2">"{testimonials[index].text}"</p>
        <span className="text-purple-600 font-semibold">{testimonials[index].name}</span>
      </div>
      <div className="flex gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-purple-500' : 'bg-purple-200'} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
