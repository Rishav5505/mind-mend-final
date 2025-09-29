import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  // Get user directly from localStorage every render
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // To refresh the navbar UI
  };

  // Theme switcher button
  const themeIcon = theme === "dark"
    ? <span className="text-xl">🌙</span>
    : <span className="text-xl">☀️</span>;

  return (
    <>

      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 px-4 py-3 backdrop-blur shadow-md ${theme === "dark" ? "bg-gray-900/90" : "bg-white/90"}`}
      >
  <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className={`text-2xl font-extrabold tracking-tight drop-shadow-sm ${theme === "dark" ? "text-purple-300" : "text-purple-700"}`}>
            MindMend
          </Link>

          <div className={`hidden md:flex flex-wrap gap-2 font-medium items-center justify-center ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            {[ 
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/contact", label: "Contact" },
              { to: "/patient/chatbot", label: "Chatbot" },
              { to: "/patient/mood", label: "Mood" },
              { to: "/patient/book", label: "Book" },
              { to: "/patient/selfhelp", label: "Self Help" },
              { to: "/patient/emergency", label: "Help" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-full transition font-semibold bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm ${theme === "dark" ? "bg-gray-800/80 hover:bg-gray-700/80 hover:text-purple-300" : ""}`}
                style={{ minWidth: 80, textAlign: 'center' }}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to={user.role === "therapist" ? "/therapist" : "/patient"}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md hover:from-purple-600 hover:to-blue-600 transition border-2 border-white/20 flex items-center justify-center ${theme === "dark" ? "bg-purple-700/80 hover:bg-purple-800/80" : ""}`}
                  style={{ minWidth: 110, textAlign: 'center' }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-md hover:from-red-600 hover:to-pink-600 transition border-2 border-white/20 flex items-center justify-center ${theme === "dark" ? "bg-red-700/80 hover:bg-red-800/80" : ""}`}
                  style={{ minWidth: 90, textAlign: 'center' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className={`ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md hover:from-purple-600 hover:to-blue-600 transition border-2 border-white/20 ${theme === "dark" ? "bg-purple-700/80 hover:bg-purple-800/80" : ""}`}
                  style={{ minWidth: 110, textAlign: 'center' }}
                >
                  Login/Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

  {/* Spacer to prevent content hiding */}
  <div style={{ height: "70px" }} />
    </>
  );
};

export default Navbar;
