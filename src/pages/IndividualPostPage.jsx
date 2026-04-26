import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";
import CommentSection from "../components/blog/CommentSection";
import footballHero from "../assets/football-hero.png";
import { ThemeContext } from "../context/theme-context";
import { nflPosts } from "../data/nflPosts";

function IndividualPostPage() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const post = nflPosts.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-10 text-center">
        <h2 className={isDark ? "mb-4 text-3xl font-black text-white" : "mb-4 text-3xl font-black text-[#0B162A]"}>
          Post Not Found
        </h2>
        <p className={isDark ? "text-[#D8DEE9]" : "text-slate-600"}>
          The NFL story you are looking for does not exist.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 font-black text-[#69BE28] transition hover:text-[#C83803]"
      >
        <ArrowLeft size={18} />
        Back to all posts
      </Link>

      <article
        className={`overflow-hidden rounded-lg border shadow-xl shadow-black/10 ${
          isDark
            ? "border-[#A5ACAF]/20 bg-[#07182A]"
            : "border-[#002244]/15 bg-white"
        }`}
      >
        <div className="relative h-72 overflow-hidden">
          <img src={footballHero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061222] via-[#061222]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <span className="rounded-full bg-[#C83803] px-3 py-2 text-xs font-black uppercase text-white">
              {post.category}
            </span>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white">
              {post.title}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className={isDark ? "mb-6 flex flex-wrap gap-5 text-sm text-[#A5ACAF]" : "mb-6 flex flex-wrap gap-5 text-sm text-slate-500"}>
            <span className="inline-flex items-center gap-2">
              <UserRound size={16} />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} />
              {post.readTime}
            </span>
          </div>

          <p className={isDark ? "text-lg leading-9 text-[#D8DEE9]" : "text-lg leading-9 text-slate-700"}>
            {post.body}
          </p>

          <div
            className={`mt-8 rounded-lg border p-5 ${
              isDark
                ? "border-[#69BE28]/30 bg-[#0B162A]"
                : "border-[#69BE28]/40 bg-[#F4F7F9]"
            }`}
          >
            <p className="font-black text-[#69BE28]">Preview is open to everyone.</p>
            <p className={isDark ? "mt-1 text-sm text-[#D8DEE9]" : "mt-1 text-sm text-slate-600"}>
              You only need to log in when you want to leave a comment.
            </p>
          </div>
        </div>
      </article>

      <CommentSection key={post.id} initialComments={post.comments} />
    </section>
  );
}

export default IndividualPostPage;
