import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import CommentForm from "./CommentForm";
import { ThemeContext } from "../../context/theme-context";
import { useUsername } from "../authWrapper/authContext";

function CommentSection({ initialComments = [] }) {
  const { theme } = useContext(ThemeContext);
  const username = useUsername();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !comment.trim()) return;

    setComments([
      {
        name: username,
        text: comment.trim(),
      },
      ...comments,
    ]);
    setComment("");
  };

  return (
    <section
      className={`rounded-lg border p-6 shadow-sm ${
        isDark
          ? "border-[#A5ACAF]/20 bg-[#07182A]"
          : "border-[#002244]/15 bg-white"
      }`}
    >
      <h3 className={isDark ? "mb-4 text-2xl font-black text-white" : "mb-4 text-2xl font-black text-[#0B162A]"}>
        Comments
      </h3>

      {username ? (
        <CommentForm
          username={username}
          comment={comment}
          setComment={setComment}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div
          className={`mb-6 rounded-lg border p-5 ${
            isDark
              ? "border-[#69BE28]/30 bg-[#0B162A]"
              : "border-[#69BE28]/40 bg-[#F4F7F9]"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 text-[#69BE28]" size={22} />
              <div>
                <p className={isDark ? "font-black text-white" : "font-black text-[#0B162A]"}>
                  Login required to comment
                </p>
                <p className={isDark ? "mt-1 text-sm text-[#D8DEE9]" : "mt-1 text-sm text-slate-600"}>
                  You can preview every article, but only logged-in fans can join the thread.
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-flex justify-center rounded-lg bg-[#69BE28] px-5 py-3 font-black text-[#0B162A] transition hover:bg-[#8EE53F]"
            >
              Login to Comment
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className={isDark ? "text-[#A5ACAF]" : "text-slate-500"}>
            No comments yet. Be the first to comment after logging in.
          </p>
        ) : (
          comments.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className={`rounded-lg border p-4 ${
                isDark
                  ? "border-[#A5ACAF]/20 bg-[#0B162A]"
                  : "border-[#002244]/10 bg-[#F4F7F9]"
              }`}
            >
              <p className={isDark ? "font-black text-white" : "font-black text-[#0B162A]"}>
                {item.name}
              </p>
              <p className={isDark ? "mt-2 text-[#D8DEE9]" : "mt-2 text-slate-700"}>
                {item.text}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CommentSection;
