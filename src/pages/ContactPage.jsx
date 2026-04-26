import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

function ContactPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      className={`mx-auto my-10 w-[calc(100%-3rem)] max-w-2xl rounded-lg border p-8 shadow-xl shadow-black/10 ${
        isDark
          ? "border-[#A5ACAF]/20 bg-[#07182A]"
          : "border-[#002244]/15 bg-white"
      }`}
    >
      <p className="text-sm font-black uppercase tracking-wide text-[#69BE28]">
        Contact
      </p>
      <h2 className={isDark ? "mt-2 text-3xl font-black text-white" : "mt-2 text-3xl font-black text-[#0B162A]"}>
        Send Patterhorn Insider a note
      </h2>

      <form className="mt-7 space-y-5">
        <input
          type="text"
          placeholder="Your name"
          className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#69BE28] ${
            isDark
              ? "border-[#A5ACAF]/25 bg-[#0B162A] text-white placeholder-[#A5ACAF]"
              : "border-[#002244]/15 bg-white text-[#0B162A] placeholder-slate-400"
          }`}
        />

        <input
          type="email"
          placeholder="Your email"
          className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#69BE28] ${
            isDark
              ? "border-[#A5ACAF]/25 bg-[#0B162A] text-white placeholder-[#A5ACAF]"
              : "border-[#002244]/15 bg-white text-[#0B162A] placeholder-slate-400"
          }`}
        />

        <textarea
          rows="5"
          placeholder="Your message"
          className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#69BE28] ${
            isDark
              ? "border-[#A5ACAF]/25 bg-[#0B162A] text-white placeholder-[#A5ACAF]"
              : "border-[#002244]/15 bg-white text-[#0B162A] placeholder-slate-400"
          }`}
        ></textarea>

        <button className="rounded-lg bg-[#C83803] px-6 py-3 font-black text-white transition hover:bg-[#FF4C14]">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default ContactPage;
