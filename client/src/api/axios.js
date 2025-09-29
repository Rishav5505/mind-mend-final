// client/src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 Tu yahi pe backend chala raha hai
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically add JWT token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 👈 token le localStorage se
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 👈 Header me token daal
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
