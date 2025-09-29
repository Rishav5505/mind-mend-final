import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function TherapistAppointments() {
  const [apps, setApps] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get("/bookings/therapist") // baseURL = /api  ➜ /api/bookings/therapist
      .then((r) => setApps(r.data))
      .catch((e) => {
        console.error("Fetch error:", e);
        setErr("Failed to load appointments");
      });
  }, []);

  if (err) return <p className="text-red-600">{err}</p>;

  if (!apps.length && !err) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-purple-600 font-semibold">Loading appointments...</p>
      </div>
    );
  }

  return apps.length === 0 ? (
    <p className="text-gray-600 text-lg py-8">No upcoming appointments.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {apps.map((a) => (
        <div
          key={a._id}
          className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-6 border border-purple-100 flex flex-col gap-2 hover:scale-105 hover:shadow-2xl transition-all duration-200"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="text-2xl sm:text-3xl text-purple-500">📅</span>
            <span className="font-bold text-base sm:text-lg text-purple-700">Appointment</span>
          </div>
          <div className="flex items-center gap-2">
            {a.user?.photoUrl ? (
              <img
                src={`http://localhost:5000${a.user.photoUrl}`}
                alt={a.user?.name || "Profile"}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-purple-200 shadow"
              />
            ) : (
              <span className="inline-block w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-lg sm:text-xl">👤</span>
            )}
            <span className="font-semibold text-sm sm:text-base">{a.user?.name || "N/A"}</span>
          </div>
          <div className="text-gray-700 text-xs sm:text-sm">
            <b>Date:</b> {a.date} <b>Time:</b> {a.time}
          </div>
          <div className="text-gray-500 text-xs">
            <b>Patient ID:</b> {a.user?._id || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
}
