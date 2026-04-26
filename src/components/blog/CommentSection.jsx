import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import CommentForm from "./CommentForm";
import { ThemeContext } from "../../context/theme-context";
import { useUsername } from "../authWrapper/authContext";
import { fetchComments, createComment } from "../../api/commentsApi";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function CommentSection({ postId }) {
  const { theme } = useContext(ThemeContext);
  const username = useUsername();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!postId) return undefined;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchComments(postId)
      .then((data) => {
        if (!cancelled) setComments(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err?.message?.includes("Network")
              ? "Could not reach the comments API. Run `npm run server`."
              : err?.message || "Failed to load comments"
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !comment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const created = await createComment({
        postId,
        name: username,
        text: comment.trim(),
      });
      setComments((prev) => [created, ...prev]);
      setComment("");
      setError(null);
    } catch (err) {
      setError(err?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
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
        Comments {comments.length > 0 && (
          <span className="text-[#69BE28]">({comments.length})</span>
        )}
      </h3>

      {username ? (
        <CommentForm
          username={username}
          comment={comment}
          setComment={setComment}
          handleSubmit={handleSubmit}
          submitting={submitting}
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

      {error && (
        <div className="mb-4 rounded-lg border border-[#C83803]/40 bg-[#C83803]/10 p-3 text-sm text-[#C83803]">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className={isDark ? "text-[#A5ACAF]" : "text-slate-500"}>
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <p className={isDark ? "text-[#A5ACAF]" : "text-slate-500"}>
            No comments yet. Be the first to comment after logging in.
          </p>
        ) : (
          comments.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-4 ${
                isDark
                  ? "border-[#A5ACAF]/20 bg-[#0B162A]"
                  : "border-[#002244]/10 bg-[#F4F7F9]"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className={isDark ? "font-black text-white" : "font-black text-[#0B162A]"}>
                  {item.name}
                </p>
                {item.createdAt && (
                  <p className={isDark ? "text-xs text-[#A5ACAF]" : "text-xs text-slate-500"}>
                    {formatDate(item.createdAt)}
                  </p>
                )}
              </div>
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
