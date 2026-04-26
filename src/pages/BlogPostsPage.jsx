import { useContext, useEffect, useState } from "react";
import BlogList from "../components/blog/BlogList";
import { ThemeContext } from "../context/theme-context";
import { getAllPosts } from "../api/postsApi";

function BlogPostsPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getAllPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load posts");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <section
        className={`mb-8 rounded-lg border p-8 ${
          isDark
            ? "border-[#A5ACAF]/20 bg-[#07182A]"
            : "border-[#002244]/15 bg-white"
        }`}
      >
        <p className="text-sm font-black uppercase tracking-wide text-[#69BE28]">
          Patterhorn Insider
        </p>
        <h2 className={isDark ? "mt-2 text-4xl font-black text-white" : "mt-2 text-4xl font-black text-[#0B162A]"}>
          NFL Blog Preview
        </h2>
        <p className={isDark ? "mt-3 max-w-3xl text-[#D8DEE9]" : "mt-3 max-w-3xl text-slate-600"}>
          Read every story without logging in. When you are ready to join the
          conversation, sign in to comment on any article.
        </p>
      </section>

      {loading && (
        <p className={isDark ? "text-[#A5ACAF]" : "text-slate-500"}>
          Loading the latest stories...
        </p>
      )}

      {error && !loading && (
        <div className="rounded-lg border border-[#C83803]/40 bg-[#C83803]/10 p-4 text-[#C83803]">
          <p className="font-black">Could not load posts.</p>
          <p className="text-sm">{error}</p>
          <p className="mt-2 text-sm">
            Make sure the local API is running: <code>npm run server</code>
          </p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className={isDark ? "text-[#A5ACAF]" : "text-slate-500"}>
          No posts available right now.
        </p>
      )}

      {!loading && posts.length > 0 && <BlogList posts={posts} />}
    </div>
  );
}

export default BlogPostsPage;
