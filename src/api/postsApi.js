import axios from "axios";
import { fetchNflPosts } from "./nflApi";

/**
 * Posts API.
 *
 * Source of truth is split between two backends:
 *   1. Our own json-server (http://localhost:4000) -> /posts
 *      Hand-written blog posts that ship with the app.
 *   2. ESPN's public NFL news API (live, read-only).
 *      Real, up-to-the-minute NFL articles fetched fresh every load.
 *
 * Both feeds are normalized to the same post shape and merged so the
 * UI never has to care which source a post came from.
 *
 * Local posts intentionally don't store an image; we pull a relevant one
 * from ESPN at fetch time by matching the post's team/category.
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const ESPN_LIMIT = 25;

// ---------------------------------------------------------------------------
// json-server (local) posts
// ---------------------------------------------------------------------------

async function fetchLocalPosts() {
  try {
    const { data } = await axios.get(`${API_URL}/posts`);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn(
      "[postsApi] Could not reach local API at",
      API_URL,
      "- did you run `npm run server`?",
      err.message
    );
    return [];
  }
}

async function fetchLocalPostById(id) {
  try {
    const { data } = await axios.get(`${API_URL}/posts/${id}`);
    return data || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Image enrichment: find an ESPN image relevant to a local post
// ---------------------------------------------------------------------------

function norm(s) {
  return (s || "").toLowerCase().trim();
}

/**
 * Pick an image URL from the ESPN feed that's most relevant to `post`.
 * Strategy:
 *   1. ESPN article with the same team -> use its image.
 *   2. ESPN article whose title mentions a key word from the post title.
 *   3. Any ESPN article that has an image.
 *   4. null (caller falls back to a local asset).
 */
function findRelevantImage(post, espnPosts) {
  if (!espnPosts?.length) return null;

  const team = norm(post.team);
  if (team && team !== "nfl") {
    const teamMatch = espnPosts.find(
      (a) => a.image && norm(a.team) === team
    );
    if (teamMatch) return teamMatch.image;

    // Looser match: team name appears anywhere in headline.
    const looseTeamMatch = espnPosts.find(
      (a) => a.image && norm(a.title).includes(team)
    );
    if (looseTeamMatch) return looseTeamMatch.image;
  }

  // Fall back to a keyword from the local post title.
  const STOP = new Set([
    "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with",
    "this", "that", "how", "why", "vs", "vs.", "is", "are",
  ]);
  const keyword = (post.title || "")
    .split(/\s+/)
    .map((w) => w.replace(/[^\w]/g, ""))
    .find((w) => w.length > 3 && !STOP.has(w.toLowerCase()));

  if (keyword) {
    const k = norm(keyword);
    const kwMatch = espnPosts.find(
      (a) => a.image && norm(a.title).includes(k)
    );
    if (kwMatch) return kwMatch.image;
  }

  // Last resort: first ESPN article that has an image.
  const anyWithImage = espnPosts.find((a) => a.image);
  return anyWithImage ? anyWithImage.image : null;
}

function enrichLocalImages(localPosts, espnPosts) {
  return localPosts.map((p) =>
    p.image ? p : { ...p, image: findRelevantImage(p, espnPosts) }
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get every post available: hand-written + live ESPN articles.
 * Local posts get their hero image enriched from a matching ESPN article
 * when possible.
 */
export async function getAllPosts() {
  const [local, espn] = await Promise.all([
    fetchLocalPosts(),
    fetchNflPosts({ limit: ESPN_LIMIT }).catch((err) => {
      console.warn("[postsApi] ESPN fetch failed:", err.message);
      return [];
    }),
  ]);

  const localTagged = enrichLocalImages(
    local.map((p) => ({ ...p, source: p.source || "local" })),
    espn
  );
  const espnTagged = espn.map((p) => ({ ...p, source: "espn" }));

  return [...localTagged, ...espnTagged];
}

/**
 * Look up a single post by id. Local posts win over ESPN if ids ever overlap.
 * Local posts have their image enriched from ESPN when missing.
 */
export async function getPostById(id) {
  const local = await fetchLocalPostById(id);
  if (local) {
    if (local.image) {
      return { ...local, source: local.source || "local" };
    }
    const espn = await fetchNflPosts({ limit: ESPN_LIMIT }).catch(() => []);
    return {
      ...local,
      source: local.source || "local",
      image: findRelevantImage(local, espn),
    };
  }

  const espnPosts = await fetchNflPosts({ limit: 50 });
  const found = espnPosts.find((p) => p.id === String(id));
  return found ? { ...found, source: "espn" } : null;
}
