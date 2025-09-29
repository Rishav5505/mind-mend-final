import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [formError, setFormError] = useState(""); // For validation error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form before submission
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill out all fields.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Only submit if form is valid

    setIsLoading(true); // Set loading state to true

    try {
      const res = await axios.post("http://localhost:5000/api/contact/send", formData);
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false); // Set loading state to false after response
    }
  };

  return (
    <section className="p-8 text-center bg-gradient-to-r from-purple-100 to-indigo-200 rounded-xl">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Contact Us</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-4">
        Have questions or need help? Reach out to us anytime.
      </p>

      {/* Show form error */}
      {formError && <p className="text-red-600">{formError}</p>}

      <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
          required
        ></textarea>
        
        {/* Show loading spinner while submitting */}
        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition duration-300 ease-in-out"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? (
            <span className="spinner-border animate-spin w-5 h-5 border-4 border-t-4 border-white rounded-full"></span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      <footer className="mt-12 text-gray-600">
        <p>&copy; MindMend 2025</p>
      </footer>
    </section>
  );
};

export default Contact;
