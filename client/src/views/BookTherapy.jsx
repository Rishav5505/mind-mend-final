// ✅ React Booking Component (Frontend)
import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // axios baseURL setup already
import { useNavigate } from "react-router-dom";

const BookTherapy = () => {
  const [therapists, setTherapists] = useState([]);
  const [therapist, setTherapist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/auth/therapists")
      .then((res) => setTherapists(res.data))
      .catch((err) => console.error("Therapist fetch error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
  "/bookings",    // ✅ Correct endpoint
  { therapistId: therapist, date, time },
  { headers: { Authorization: `Bearer ${token}` } }
);


  alert("Appointment booked ✅");
  // Payment page par redirect karo
  navigate("/payment");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to book appointment ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Book Therapy Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Therapist:</label>
          <select
            value={therapist}
            onChange={(e) => setTherapist(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">-- Select --</option>
            {therapists.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookTherapy;
