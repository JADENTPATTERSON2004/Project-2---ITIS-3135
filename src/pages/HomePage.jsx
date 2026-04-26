import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Headphones,
  LogIn,
  Newspaper,
  Radio,
  Users,
} from "lucide-react";
import footballHero from "../assets/football-hero.png";
import { ThemeContext } from "../context/theme-context";
import { getAllPosts } from "../api/postsApi";
import { useUsername } from "../components/authWrapper/authContext";

const stats = [
  { icon: Newspaper, value: "1,200+", label: "Articles" },
  { icon: Users, value: "50K+", label: "Fans" },
  { icon: Radio, value: "Daily", label: "New Content" },
];

function HomePage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const username = useUsername();

  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getAllPosts()
      .then((all) => {
        if (!cancelled) setFeaturedPosts(all.slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setFeaturedPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={isDark ? "bg-[#0B162A] text-white" : "bg-[#F4F7F9] text-[#0B162A]"}>
      <section className="relative isolate overflow-hidden border-y border-[#A5ACAF]/20 bg-[#0B162A]">
        <img
          src={footballHero}
          alt="Football stadium illustration"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061222] via-[#061222]/90 to-[#061222]/35" />
        <div className="absolute inset-y-0 left-0 hidden w-24 border-r border-white/10 bg-[linear-gradient(to_bottom,transparent_0_20px,rgba(165,172,175,.45)_20px_22px,transparent_22px_42px)] opacity-60 md:block" />
        <div className="absolute right-0 top-12 hidden h-72 w-24 skew-x-[-24deg] bg-[#C83803] lg:block" />
        <div className="absolute right-24 top-72 hidden h-44 w-12 skew-x-[-24deg] bg-[#69BE28] lg:block" />

        <div className="mx-auto grid min-h-[620px] max-w-6xl items-center px-6 py-16 md:grid-cols-[1fr_0.85fr] md:pl-28">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-xs font-black uppercase tracking-wide text-white backdrop-blur">
              <span className="px-3 py-2">Your game.</span>
              <span className="bg-[#69BE28] px-3 py-2 text-[#0B162A]">Your voice.</span>
            </p>

            <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">
              Welcome to the Ultimate{" "}
              <span className="text-[#C83803]">NFL</span>{" "}
              <span className="text-[#69BE28]">Blog</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#D8DEE9]">
              Patterhorn Insider is your destination for NFL news, game recaps,
              in-depth analysis, and passionate fan conversation.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {username ? (
                <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C83803] px-7 py-4 text-base font-black text-white shadow-lg shadow-black/30">
                  Hi, {username}
                </span>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C83803] px-7 py-4 text-base font-black text-white shadow-lg shadow-black/30 transition hover:bg-[#FF4C14]"
                >
                  <LogIn size={20} />
                  Login
                </Link>
              )}
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#69BE28] bg-[#0B162A]/70 px-7 py-4 text-base font-black text-white backdrop-blur transition hover:bg-[#69BE28] hover:text-[#0B162A]"
              >
                <Headphones size={20} />
                Explore Blog
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl gap-3 rounded-lg border border-white/15 bg-[#0B162A]/70 p-4 backdrop-blur sm:grid-cols-3">
              {stats.map((stat) => {
                const StatIcon = stat.icon;

                return (
                  <div key={stat.label} className="flex items-center gap-3 sm:justify-center">
                    <StatIcon className="text-[#A5ACAF]" size={26} />
                    <div>
                      <p className="font-black text-white">{stat.value}</p>
                      <p className="text-sm text-[#D8DEE9]">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#69BE28]">
              Trending now
            </p>
            <h2 className={isDark ? "text-3xl font-black text-white" : "text-3xl font-black text-[#0B162A]"}>
              Featured Stories
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-black text-[#69BE28] transition hover:text-[#C83803]"
          >
            View all posts
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className={`group overflow-hidden rounded-lg border shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-[#69BE28] ${
                isDark ? "border-[#A5ACAF]/25 bg-[#07182A]" : "border-[#A5ACAF]/35 bg-white"
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.image || footballHero}
                  alt=""
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                    index === 1 ? "object-center" : index === 2 ? "object-right" : "object-left"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061222] to-transparent" />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-2 text-xs font-black uppercase ${
                    index === 1 ? "bg-[#69BE28] text-[#0B162A]" : "bg-[#C83803] text-white"
                  }`}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className={isDark ? "text-xl font-black text-white" : "text-xl font-black text-[#0B162A]"}>
                  {post.title}
                </h3>
                <p className={isDark ? "mt-3 text-sm leading-6 text-[#D8DEE9]" : "mt-3 text-sm leading-6 text-slate-600"}>
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid items-center gap-6 rounded-lg border border-[#A5ACAF]/25 bg-[linear-gradient(135deg,#07182A,#0B162A_55%,#002244)] p-8 text-white md:grid-cols-[auto_1fr_auto]">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/20 bg-white/10">
            <Headphones size={42} />
          </div>
          <div>
            <h2 className="text-3xl font-black">
              Join the <span className="text-[#C83803]">NFL</span>{" "}
              <span className="text-[#69BE28]">Conversation</span>
            </h2>
            <p className="mt-2 text-[#D8DEE9]">
              Create an account to comment, share your take, and never miss a story.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#69BE28] px-8 py-4 font-black text-[#0B162A] transition hover:bg-[#8EE53F]"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
