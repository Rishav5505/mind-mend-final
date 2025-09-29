import { Outlet, Link } from "react-router-dom";

const PatientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")); // user object le rahe ho
  const username = user?.username || user?.name || user?.email || "Patient"; // Fallbacks laga do

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-100 min-h-screen p-4">
        <h2 className="font-bold mb-4">Patient Panel</h2>
        <ul className="space-y-2">
          <li>🧠 <Link to="/patient/mood">Mood Tracker</Link></li>
          <li>📅 <Link to="/patient/book">Book Therapy</Link></li>
          <li>📘 <Link to="/patient/selfhelp">Self Help</Link></li>
          <li>💬 <Link to="/patient/forum">Forum</Link></li>
          <li>🚨 <Link to="/patient/emergency">Emergency</Link></li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-8 bg-blue-50">
        <h1 className="text-xl font-bold mb-6">Welcome, {username}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashboard;
