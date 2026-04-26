import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useUsername, useAuth } from "../authWrapper/authContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const username = useUsername();
  const { logout } = useAuth();

  const linkClass = `text-sm font-semibold transition ${
    theme === "dark"
      ? "text-gray-200 hover:text-blue-400"
      : "text-gray-700 hover:text-blue-600"
  }`;

  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className={linkClass}>Home</Link>
      <Link to="/contact" className={linkClass}>Contact</Link>
      {username ? (
        <button onClick={logout} className={linkClass}>Hi {username}, Logout</button>
      ) : (
        <Link to="/login" className={linkClass}>Login</Link>
      )}

      <button
        onClick={toggleTheme}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          theme === "dark"
            ? "bg-white text-gray-900 hover:bg-gray-200"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
}

export default Navbar;