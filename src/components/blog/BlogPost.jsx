import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock3, ThumbsUp } from "lucide-react";
import footballHero from "../../assets/football-hero.png";
import { ThemeContext } from "../../context/theme-context";

function BlogPost({ post }) {
  const { theme } = useContext(ThemeContext);
  const [likes, setLikes] = useState(0);
  const isDark = theme === "dark";

  return (
    <article
      className={`overflow-hidden rounded-lg border shadow-sm transition hover:-translate-y-1 hover:border-[#69BE28] hover:shadow-xl ${
        isDark
          ? "border-[#A5ACAF]/20 bg-[#07182A]"
          : "border-[#002244]/15 bg-white"
      }`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={footballHero}
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061222] to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-[#C83803] px-3 py-2 text-xs font-black uppercase text-white">
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <p className="text-sm font-black uppercase tracking-wide text-[#69BE28]">
          {post.team}
        </p>
        <h2 className={isDark ? "mt-2 text-2xl font-black text-white" : "mt-2 text-2xl font-black text-[#0B162A]"}>
          {post.title}
        </h2>

        <p className={isDark ? "mt-4 leading-7 text-[#D8DEE9]" : "mt-4 leading-7 text-slate-600"}>
          {post.excerpt}
        </p>

        <div className={isDark ? "mt-5 flex flex-wrap gap-4 text-sm text-[#A5ACAF]" : "mt-5 flex flex-wrap gap-4 text-sm text-slate-500"}>
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={16} />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 size={16} />
            {post.readTime}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            to={`/post/${post.id}`}
            className="rounded-lg bg-[#69BE28] px-4 py-2 text-sm font-black text-[#0B162A] transition hover:bg-[#8EE53F]"
          >
            Preview Article
          </Link>

          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-2 rounded-lg bg-[#C83803] px-4 py-2 text-sm font-black text-white transition hover:bg-[#FF4C14]"
          >
            <ThumbsUp size={18} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
