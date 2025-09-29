import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      let res;
      if (isLogin) {
        res = await axios.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "therapist") {
          localStorage.setItem("therapistId", user._id);
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => navigate("/therapist/patients"), 1200);
        } else {
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => navigate("/patient"), 1200);
        }
      } else {
        res = await axios.post("/auth/signup", form);
        setSuccess("Signup successful! OTP sent to your email.");
        setOtpMode(true);
        setPendingEmail(form.email);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("/auth/verify-otp", { email: pendingEmail, otp });
      setSuccess("Email verified! You can now login.");
      setOtpMode(false);
      setIsLogin(true);
      setForm({ ...form, email: pendingEmail });
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 px-4">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-center mb-6 drop-shadow-lg">
          {isLogin ? "Login to MindMend" : "Signup for MindMend"}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-center animate-shake shadow">
            {error}
            {error.includes("Email not verified") && !otpMode && (
              <button
                className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow hover:from-purple-600 hover:to-blue-600 transition"
                onClick={() => {
                  setOtpMode(true);
                  setPendingEmail(form.email);
                  setError("");
                  setSuccess("");
                }}
              >
                Verify OTP
              </button>
            )}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center animate-fadein shadow">
            {success}
          </div>
        )}

        {!otpMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition shadow"
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition shadow"
              onChange={handleChange}
              required
              value={form.email}
              disabled={otpMode}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition shadow pr-12"
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 cursor-pointer select-none"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
            {!isLogin && (
              <select
                name="role"
                className="w-full p-3 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition shadow"
                onChange={handleChange}
                required
              >
                <option value="patient">Patient</option>
                <option value="therapist">Therapist</option>
              </select>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all text-lg"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP sent to your email"
              className="w-full p-3 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition shadow"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all text-lg"
            >
              Verify OTP
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm">
          {isLogin ? "New to MindMend?" : "Already have an account?"} {" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
          >
            {isLogin ? "Signup here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
