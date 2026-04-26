import { useContext } from "react";
import { Send } from "lucide-react";
import { ThemeContext } from "../../context/theme-context";

function CommentForm({ username, comment, setComment, handleSubmit, submitting = false }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <p className={isDark ? "text-sm font-semibold text-[#A5ACAF]" : "text-sm font-semibold text-slate-500"}>
        Commenting as <span className="text-[#69BE28]">{username}</span>
      </p>

      <textarea
        placeholder="Share your game-day take..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`min-h-28 w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#69BE28] ${
          isDark
            ? "border-[#A5ACAF]/25 bg-[#0B162A] text-white placeholder-[#A5ACAF]"
            : "border-[#002244]/15 bg-white text-[#0B162A] placeholder-slate-400"
        }`}
      ></textarea>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-lg bg-[#C83803] px-5 py-3 font-black text-white transition hover:bg-[#FF4C14] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} />
        {submitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
