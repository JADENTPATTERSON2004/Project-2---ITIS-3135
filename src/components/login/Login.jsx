import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import { useAuth } from "../authWrapper/authContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const isDark = theme === "dark";

  const onSubmit = (e) => {
    e.preventDefault();
    if (!userData.username.trim()) return;
    login(userData.username.trim());
    navigate("/blog");
  };

  return (
    <section
      className={`mx-auto my-10 w-[calc(100%-3rem)] max-w-2xl rounded-lg border p-8 shadow-xl shadow-black/10 ${
        isDark
          ? "border-[#A5ACAF]/20 bg-[#07182A]"
          : "border-[#002244]/15 bg-white"
      }`}
    >
      <p className="text-sm font-black uppercase tracking-wide text-[#69BE28]">
        Fan access
      </p>
      <h2 className={isDark ? "mt-2 text-3xl font-black text-white" : "mt-2 text-3xl font-black text-[#0B162A]"}>
        Login to join the huddle
      </h2>
      <p className={isDark ? "mt-2 text-[#D8DEE9]" : "mt-2 text-slate-600"}>
        Articles are open to preview. Logging in unlocks commenting.
      </p>

      <form className="mt-7 space-y-5" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#69BE28] ${
            isDark
              ? "border-[#A5ACAF]/25 bg-[#0B162A] text-white placeholder-[#A5ACAF]"
              : "border-[#002244]/15 bg-white text-[#0B162A] placeholder-slate-400"
          }`}
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#69BE28] ${
            isDark
              ? "border-[#A5ACAF]/25 bg-[#0B162A] text-white placeholder-[#A5ACAF]"
              : "border-[#002244]/15 bg-white text-[#0B162A] placeholder-slate-400"
          }`}
        />

        <button
          type="submit"
          className="rounded-lg bg-[#C83803] px-6 py-3 font-black text-white transition hover:bg-[#FF4C14]"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
