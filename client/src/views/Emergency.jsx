import React from "react";

const Emergency = () => {
  const handleClick = () => {
    alert("Emergency team notified. Help is on the way.");
    // Future: send alert to backend/therapist/trusted contact
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 text-center">
      <h2 className="text-3xl font-bold text-red-700 mb-4">Emergency Help</h2>
      <p className="mb-4 text-lg text-gray-800">If you're in crisis, please contact:</p>

      <ul className="mb-6 text-lg text-gray-700 space-y-2">
        <li>📞 <strong>112</strong> - National Emergency</li>
        <li>📞 <strong>9152987821</strong> - Mental Health Helpline</li>
      </ul>

      <button
        onClick={handleClick}
        className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-red-700 transition"
      >
        🚨 SOS
      </button>
    </div>
  );
};

export default Emergency;
