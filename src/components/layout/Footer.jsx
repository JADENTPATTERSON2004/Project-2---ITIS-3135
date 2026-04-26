import { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`border-t py-6 text-center ${
        theme === "dark"
          ? "border-[#A5ACAF]/20 bg-[#07182A] text-[#A5ACAF]"
          : "border-[#002244]/15 bg-white text-slate-500"
      }`}
    >
      <p>© 2026 Patterhorn Insider. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
