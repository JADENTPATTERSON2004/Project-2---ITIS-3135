import { useContext } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../context/theme-context";
import { useUsername, useAuth } from "../authWrapper/authContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const username = useUsername();
  const { logout } = useAuth();
  const isDark = theme === "dark";

  const linkClass = `text-sm font-bold transition ${
    isDark
      ? "text-[#D8DEE9] hover:text-[#69BE28]"
      : "text-[#0B162A] hover:text-[#C83803]"
  }`;

  return (
    <nav className="flex flex-wrap items-center justify-end gap-4 sm:gap-6">
      <Link to="/" className={linkClass}>
        Home
      </Link>
      <Link to="/blog" className={linkClass}>
        Blog
      </Link>
      <Link to="/contact" className={linkClass}>
        Contact
      </Link>

      {username ? (
        <button onClick={logout} className={linkClass}>
          Hi {username}, Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="rounded-lg border border-[#A5ACAF]/40 px-4 py-2 text-sm font-black text-inherit transition hover:border-[#C83803] hover:text-[#C83803]"
        >
          Login
        </Link>
      )}

      <Link
        to="/blog"
        className="rounded-lg bg-[#69BE28] px-4 py-2 text-sm font-black text-[#0B162A] transition hover:bg-[#8EE53F]"
      >
        Explore Blog
      </Link>

      <button
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
          isDark
            ? "border-[#A5ACAF]/30 bg-white/5 text-[#69BE28] hover:border-[#69BE28]"
            : "border-[#002244]/15 bg-[#0B162A] text-white hover:bg-[#002244]"
        }`}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}

export default Navbar;
