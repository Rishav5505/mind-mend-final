import { useState } from "react";
import axios from "../api/axios"; // ✅ axios instance
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // or "therapist"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", formData);
      alert("✅ Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="mb-4 p-2 w-full border"
      >
        <option value="patient">Patient</option>
        <option value="therapist">Therapist</option>
      </select>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
