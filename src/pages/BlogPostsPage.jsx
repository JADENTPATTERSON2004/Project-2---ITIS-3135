import { useContext } from "react";
import BlogList from "../components/blog/BlogList";
import { ThemeContext } from "../context/theme-context";
import { nflPosts } from "../data/nflPosts";

function BlogPostsPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

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

      <BlogList posts={nflPosts} />
    </div>
  );
}

export default BlogPostsPage;
