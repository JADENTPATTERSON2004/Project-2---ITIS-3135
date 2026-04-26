import { useContext } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import Navbar from "./Navbar";
import { ThemeContext } from "../../context/theme-context";

function Header() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur ${
        isDark
          ? "border-[#A5ACAF]/20 bg-[#0B162A]/95"
          : "border-[#002244]/15 bg-white/95"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#C83803]/50 bg-[#07182A] text-[#C83803]">
            <Shield size={28} />
          </span>
          <div>
            <h1
              className={
                isDark
                  ? "text-xl font-black uppercase leading-5 text-white"
                  : "text-xl font-black uppercase leading-5 text-[#0B162A]"
              }
            >
              Patterhorn
              <span className="block text-[#C83803]">Insider</span>
            </h1>
            <p
              className={
                isDark
                  ? "text-xs font-semibold text-[#A5ACAF]"
                  : "text-xs font-semibold text-slate-500"
              }
            >
              NFL news, recaps, and fan takes
            </p>
          </div>
        </Link>

        <Navbar />
      </div>
    </header>
  );
}

export default Header;
