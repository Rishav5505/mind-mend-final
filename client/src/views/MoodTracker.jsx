import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const moods = [
  { mood: "Happy", emoji: "😊" },
  { mood: "Sad", emoji: "😢" },
  { mood: "Stressed", emoji: "😣" },
  { mood: "Angry", emoji: "😠" },
  { mood: "Relaxed", emoji: "😌" },
];

import { motion } from "framer-motion";
import LineChart from "./LineChart";
const moodTips = {
  Happy: "Keep spreading positivity! Celebrate your wins today.",
  Sad: "It's okay to feel sad. Take a deep breath and talk to someone you trust.",
  Stressed: "Try a short meditation or a walk. You are stronger than your stress.",
  Angry: "Pause and count to ten. Express your feelings calmly when you're ready.",
  Relaxed: "Enjoy the peace. Maybe share your calm with someone else today!",
};

const aiSuggestions = {
  Happy: "Share your happiness with a friend or write down what made you smile today.",
  Sad: "Try listening to your favorite music or journaling your feelings.",
  Stressed: "Try a guided meditation or deep breathing exercise. Take a short break from screens.",
  Angry: "Go for a walk, or try a quick workout to release tension.",
  Relaxed: "Consider a gratitude exercise or gentle stretching to maintain your calm.",
};

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const emoji = (m) => moods.find((e) => e.mood === m)?.emoji || "🙂";

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/moods", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setMoodHistory)
      .catch((err) => console.error("History error:", err));
  }, [token]);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    setLoading(true);
    try {
      const res = await fetch("/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood: selectedMood, note }),
      });
      if (!res.ok) throw new Error("Request failed");
      const saved = await res.json();
      setMoodHistory((prev) => [saved, ...prev]);
      setSelectedMood(null);
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Could not save mood");
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data for last 7 days
  const chartData = (() => {
    if (!moodHistory.length) return null;
    // Get last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString();
    });
    // Map moods to numbers
    const moodMap = { Happy: 5, Relaxed: 4, Stressed: 3, Sad: 2, Angry: 1 };
    // Aggregate moods by day
    const dayMoods = days.map((day) => {
      const entry = moodHistory.find((e) => new Date(e.createdAt).toLocaleDateString() === day);
      return entry ? moodMap[entry.mood] || 0 : null;
    });
    return {
      labels: days,
      datasets: [
        {
          label: "Mood Level",
          data: dayMoods,
          fill: false,
          borderColor: "#34d399",
          backgroundColor: "#a7f3d0",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "#6366f1",
        },
      ],
    };
  })();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Mood Trend (Last 7 Days)", color: "#059669", font: { size: 18 } },
      tooltip: { callbacks: { label: (ctx) => {
        const val = ctx.parsed.y;
        return ["Angry", "Sad", "Stressed", "Relaxed", "Happy"][val-1] || "No Data";
      } } },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (v) => ["Angry", "Sad", "Stressed", "Relaxed", "Happy"][v-1],
          color: "#059669",
        },
        grid: { color: "#d1fae5" },
      },
      x: {
        grid: { color: "#d1fae5" },
        ticks: { color: "#059669" },
      },
    },
    animation: { duration: 1200, easing: "easeOutQuart" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center px-2 py-8">
      <motion.div
        className="w-full max-w-2xl mx-auto bg-white/60 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-200/40"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-8 drop-shadow-lg text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mood Tracker
        </motion.h1>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 text-center">How do you feel today?</p>
          <div className="flex gap-4 justify-center">
            {moods.map((item) => (
              <motion.button
                key={item.mood}
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(item.mood)}
                className={`text-4xl px-5 py-3 rounded-full shadow-lg transition-all font-bold border-2 ${
                  selectedMood === item.mood
                    ? "bg-gradient-to-r from-green-400 to-blue-400 text-white border-green-400"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                }`}
                style={{ minWidth: 70 }}
              >
                {item.emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Motivational Tip Card + AI Suggestion */}
        {selectedMood && (
          <>
            <motion.div
              className="mb-4 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md w-full bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-4 border border-green-300 dark:border-green-700 text-center">
                <div className="text-2xl mb-2">{emoji(selectedMood)} {selectedMood}</div>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-200">{moodTips[selectedMood]}</div>
              </div>
            </motion.div>
            <motion.div
              className="mb-6 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="max-w-md w-full bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow p-3 border border-blue-200 dark:border-blue-700 text-center">
                <div className="text-base font-semibold text-blue-700 dark:text-blue-300">AI Suggestion:</div>
                <div className="text-md text-gray-700 dark:text-gray-200 mt-1">{aiSuggestions[selectedMood]}</div>
              </div>
            </motion.div>
          </>
        )}

        <motion.textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Why do you feel this way? (optional)"
          className="w-full h-24 mt-3 p-3 rounded-xl border-2 border-green-200 dark:border-green-700 bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.button
          onClick={handleSubmit}
          disabled={!selectedMood || loading}
          className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
              Saving...
            </span>
          ) : (
            "Submit Mood"
          )}
        </motion.button>

        {/* Animated Mood Chart */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {chartData ? (
            <div className="bg-white/80 dark:bg-gray-800 rounded-2xl shadow p-4 border border-green-100 dark:border-green-700">
              <LineChart data={chartData} options={chartOptions} />
            </div>
          ) : (
            <p className="italic text-gray-500 text-center">No mood data for chart</p>
          )}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300 text-center">Your Mood History</h2>
          {moodHistory.length === 0 ? (
            <p className="italic text-gray-500 text-center">No moods yet</p>
          ) : (
            <div className="flex flex-col gap-4">
              {moodHistory.map((entry) => (
                <motion.div
                  key={entry._id}
                  className="flex items-center gap-4 bg-white/80 dark:bg-gray-800 rounded-xl shadow p-4 border border-green-100 dark:border-green-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">{emoji(entry.mood)}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-green-700 dark:text-green-300">{entry.mood}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(entry.createdAt).toLocaleString()}</div>
                    {entry.note && (
                      <div className="mt-1 text-gray-700 dark:text-gray-200 italic">{entry.note}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
